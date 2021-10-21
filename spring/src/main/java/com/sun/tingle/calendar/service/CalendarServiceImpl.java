package com.sun.tingle.calendar.service;

import com.sun.tingle.calendar.db.entity.CalendarEntity;
import com.sun.tingle.calendar.db.entity.ShareCalendarEntity;
import com.sun.tingle.calendar.db.repo.CalendarRepository;
import com.sun.tingle.calendar.db.repo.ShareCalendarRepository;
import com.sun.tingle.calendar.responsedto.CalendarRpDto;
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
    @Override
    public CalendarRpDto insertCalendar(String calendarCode,String calendarName,String memberId) {
        CalendarEntity calendarEntity = new CalendarEntity();
        calendarEntity.setCalendarCode(calendarCode);
        calendarEntity.setCalendarName(calendarName);
        calendarEntity.setMemberId(memberId);
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
    public CalendarRpDto updateCalendar(String calendarCode,String calendarName) {
        CalendarEntity calendarEntity = calendarRepository.findByCalendarCode(calendarCode);
        calendarEntity.setCalendarName(calendarName);
        calendarEntity=calendarRepository.save(calendarEntity);
    //        CalendarRpDto calendarRpDto = buildCalendar(calendarEntity);
        return buildCalendar(calendarEntity);

    }

    @Override
    public void deleteCalendar(String calendarCode) {
        calendarRepository.deleteById(calendarCode);
    }


    @Override
    public Map<String,Object> insertShareCalendar(String calendarCode,String memberId) {
        Map<String,Object> map = new HashMap<>();
        CalendarRpDto calendarRpDto = selectCalendar(calendarCode);
        if(calendarRpDto == null) {
            map.put("flag",-1);
            return map;
        }
        ShareCalendarEntity shareCalendarEntity2 = new ShareCalendarEntity();
        shareCalendarEntity2.setCalendarCode(calendarCode);
        shareCalendarEntity2.setMemberId(memberId);

        ShareCalendarEntity shareCalendarEntity = shareCalendarRepository.findByCalendarCodeAndMemberId(calendarCode,memberId);
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
    public void deleteShareCalendar(String calendarCode,String memberId) {
        ShareCalendarEntity shareCalendarEntity = shareCalendarRepository.findByCalendarCodeAndMemberId(calendarCode,memberId);
        shareCalendarRepository.delete(shareCalendarEntity);
    }

    @Override
    public List<CalendarRpDto> getMyCalendarList(String memberId) {
        List<CalendarEntity> list = calendarRepository.findByMemberId(memberId);
        List<CalendarRpDto> list2 = builderCalendarList(list);
        return list2;
    }


    @Override
    public List<CalendarRpDto> getShareCalendarList(String memberId) {
        List<ShareCalendarEntity> list1 = shareCalendarRepository.findCalendarCodeByMemberId(memberId);
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
                memberId(calendarEntity.getMemberId()).
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
}
