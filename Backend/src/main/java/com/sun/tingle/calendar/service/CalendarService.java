package com.sun.tingle.calendar.service;

import com.sun.tingle.calendar.db.entity.CalendarEntity;
import com.sun.tingle.calendar.db.entity.ShareCalendarEntity;

import java.util.List;
import java.util.Map;

public interface CalendarService {

    CalendarEntity insertCalendar(String calendarCode,String calendarName,String memberId);
    CalendarEntity selectCalendar(String calendarCode);
    CalendarEntity updateCalendar(String calendarCode,String calendarName);
    void deleteCalendar(String calendarCode);
//    ShareCalendarEntity selectShareCalendar(Map<String,String> map);
    Map<String,Object> insertShareCalendar(String calendarCode,String memberId);
//    ShareCalendarEntity selectShareCalendar(String calendarCode, String memberId);
    void deleteShareCalendar(String calendarCode,String memberId);

    List<CalendarEntity> getMyCalendarList(String memberId);
    List<CalendarEntity> getShareCalendarList(String memberId);

}
