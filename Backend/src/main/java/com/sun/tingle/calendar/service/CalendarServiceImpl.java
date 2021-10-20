package com.sun.tingle.calendar.service;

import com.sun.tingle.calendar.db.entity.CalendarEntity;
import com.sun.tingle.calendar.db.entity.ShareCalendarEntity;
import com.sun.tingle.calendar.db.repo.CalendarRepository;
import com.sun.tingle.calendar.db.repo.ShareCalendarRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
public class CalendarServiceImpl implements CalendarService{

    @Autowired
    CalendarRepository calendarRepository;

    @Autowired
    ShareCalendarRepository shareCalendarRepository;
    @Override
    public CalendarEntity insertCalendar(String calendarCode,String calendarName,String memberId) {
        CalendarEntity calendarEntity = new CalendarEntity();
        calendarEntity.setCalendarCode(calendarCode);
        calendarEntity.setCalendarName(calendarName);
        calendarEntity.setMemberId(memberId);
        return calendarRepository.save(calendarEntity);
    }

    @Override
    public CalendarEntity selectCalendar(String calendarCode) {
        Optional<CalendarEntity> calendarEntity = calendarRepository.
                                                  findByCalendarCode(calendarCode);
        return calendarEntity.orElse(null);
    }

    @Override
    public CalendarEntity updateCalendar(String calendarCode,String calendarName) {
        CalendarEntity calendarEntity = selectCalendar(calendarCode); // teacher_id 때문
        calendarEntity.setCalendarName(calendarName);
        return calendarRepository.save(calendarEntity);
    }

    @Override
    public void deleteCalendar(String calendarCode) {
        calendarRepository.deleteById(calendarCode);
    }


    @Override
    public Map<String,Object> insertShareCalendar(String calendarCode,String memberId) {
        Map<String,Object> map = new HashMap<>();
        CalendarEntity calendarEntity = selectCalendar(calendarCode);
        if(calendarEntity == null) {
            map.put("flag",-1);
            return map;
        }
        ShareCalendarEntity shareCalendarEntity2 = new ShareCalendarEntity();
        shareCalendarEntity2.setCalendarCode(calendarCode);
        shareCalendarEntity2.setMemberId(memberId);

        //중복 삽입 어케 할지 생각하자..
        ShareCalendarEntity shareCalendarEntity = shareCalendarRepository.findByCalendarCodeAndMemberId(calendarCode,memberId);
        if(shareCalendarEntity != null) {
            map.put("flag",-2);
            return map;
        }
        shareCalendarRepository.save(shareCalendarEntity2);
        map.put("flag",0);
        map.put("calendarEntity",calendarEntity);
        return map;
    }






    @Override
    public void deleteShareCalendar(String calendarCode,String memberId) {
        ShareCalendarEntity shareCalendarEntity = shareCalendarRepository.findByCalendarCodeAndMemberId(calendarCode,memberId);
        shareCalendarRepository.delete(shareCalendarEntity);
    }

    @Override
    public List<CalendarEntity> getShareCalendarList(String memberId) {
        return null;
    }
}
