package com.sun.tingle.calendar.service;

import com.sun.tingle.calendar.db.entity.CalendarEntity;
import com.sun.tingle.calendar.db.entity.ShareCalendarEntity;
import com.sun.tingle.calendar.db.repo.CalendarRepository;
import com.sun.tingle.calendar.db.repo.ShareCalendarRepository;
import com.sun.tingle.calendar.responsedto.CalendarRpDto;
import com.sun.tingle.file.service.S3service;
import com.sun.tingle.member.db.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
public class CalendarServiceImpl implements CalendarService{

    @Autowired
    CalendarRepository calendarRepository;

    @Autowired
    ShareCalendarRepository shareCalendarRepository;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    S3service s3service;

    @Override
    public CalendarRpDto insertCalendar(String calendarCode,String calendarName,long id) {

        CalendarEntity calendarEntity = new CalendarEntity();
        calendarEntity.setCalendarCode(calendarCode);
        calendarEntity.setCalendarName(calendarName);
        calendarEntity.setId(id);
        calendarEntity =  calendarRepository.save(calendarEntity);
        CalendarRpDto calendarRpDto = buildCalendar(calendarEntity);
        return calendarRpDto;
    }

    @Override
    public CalendarRpDto selectCalendar(String calendarCode) {
        CalendarEntity calendarEntity = calendarRepository.findByCalendarCode(calendarCode);
        if(calendarEntity == null) {
            return null;
        }
//        CalendarRpDto calendarRpDto = buildCalendar(calendarEntity);
        return buildCalendar(calendarEntity);
    }

    @Override
    public CalendarRpDto updateCalendar(String calendarCode,String calendarName,Long id) {

        CalendarEntity calendarEntity = calendarRepository.findByCalendarCode(calendarCode);
        if(calendarEntity.getId() != id) {
            return null;
        }
        calendarEntity.setCalendarName(calendarName);
        calendarEntity=calendarRepository.save(calendarEntity);
    //        CalendarRpDto calendarRpDto = buildCalendar(calendarEntity);
        return buildCalendar(calendarEntity);

    }

    @Override
    public int deleteCalendar(String calendarCode,Long id) {
        CalendarEntity calendarEntity = calendarRepository.findByCalendarCode(calendarCode);
        if(calendarEntity.getId() != id) { // 등록한 사람아닐 때 권한 x
            return 1;
        }

        String defaultCalendar = memberRepository.findById(id).get().getDefaultCalendar();

        if(defaultCalendar.equals(calendarCode)) {
            return 3;
        }

        calendarRepository.deleteById(calendarCode);
        s3service.s3CalendarDelete(calendarCode);
        return 2;
    }


    @Override
    public Map<String,Object> insertShareCalendar(String calendarCode,long id) {
        Map<String,Object> map = new HashMap<>();
        CalendarRpDto calendarRpDto = selectCalendar(calendarCode);
        if(calendarRpDto == null) {
            map.put("flag",-1);
            return map;
        }
        else if(calendarRpDto.getId() == id) { // 본인이 등록한 캘린더를 공유하려고 할때
            map.put("flag",-3);
            return map;
        }
        ShareCalendarEntity shareCalendarEntity2 = new ShareCalendarEntity();
        shareCalendarEntity2.setCalendarCode(calendarCode);
        shareCalendarEntity2.setId(id);

        ShareCalendarEntity shareCalendarEntity = shareCalendarRepository.findByCalendarCodeAndId(calendarCode,id);
        if(shareCalendarEntity != null) {
            map.put("flag",-2);
            return map;
        }
        shareCalendarRepository.save(shareCalendarEntity2);
        map.put("flag",0);
        map.put("calendarRpDto",calendarRpDto);
        return map;
    }






    @Override
    public void deleteShareCalendar(String calendarCode,long id) {
        ShareCalendarEntity shareCalendarEntity = shareCalendarRepository.findByCalendarCodeAndId(calendarCode,id);
        shareCalendarRepository.delete(shareCalendarEntity);
    }

    @Override
    public List<CalendarRpDto> getMyCalendarList(long id) {
        List<CalendarEntity> list = calendarRepository.findById(id);
        List<CalendarRpDto> list2 = builderCalendarList(list);
        return list2;
    }


    @Override
    public List<CalendarRpDto> getShareCalendarList(long id) {
        List<ShareCalendarEntity> list1 = shareCalendarRepository.findCalendarCodeById(id);
        int size = list1.size();
        List<CalendarEntity> list2 = new ArrayList<>();
        for(int i=0; i<size; i++) {
            CalendarEntity c = calendarRepository.findByCalendarCode(list1.get(i).getCalendarCode());
            list2.add(c);
        }
        List<CalendarRpDto> list = new ArrayList<>();
        list = builderCalendarList(list2);
        return list;
    }


    public CalendarRpDto buildCalendar(CalendarEntity calendarEntity) {
        CalendarRpDto calendarRpDto = new CalendarRpDto();

        calendarRpDto = calendarRpDto.builder().
                calendarCode(calendarEntity.getCalendarCode()).
                calendarName(calendarEntity.getCalendarName()).
                id(calendarEntity.getId()).
                build();



        return calendarRpDto;
    }
    public List<CalendarRpDto> builderCalendarList(List<CalendarEntity> list) {
        int size = list.size();
        List<CalendarRpDto> list2 = new ArrayList<>();
        CalendarEntity calendarEntity = null;
        CalendarRpDto calendarRpDto = new CalendarRpDto();
        for(int i=0; i<size; i++) {
            calendarEntity = list.get(i);
            calendarRpDto = buildCalendar(calendarEntity);
            list2.add(calendarRpDto);
        }
        return list2;
    }

    @Override
    public String getRandomSentence() {
        String randomValue = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
        int len = randomValue.length();
        StringBuilder sb = new StringBuilder();

        for(int i=0; i<10; i++) {
            int idx = (int)(len * Math.random());

            sb.append(randomValue.charAt(idx));
        }


        return sb.toString();
    }

    @Override
    public List<Long> getMembersByCalendarCode(String calendarCode) {
        List<Long> list = calendarRepository.findIdByCalendarCode(calendarCode);
        List<Long> list2 = shareCalendarRepository.findIdByCalendarCode(calendarCode);
        list.addAll(list2);
        return list;
    }
}
