package com.sun.tingle.calendar.controller;


import com.sun.tingle.calendar.db.entity.CalendarEntity;
import com.sun.tingle.calendar.responsedto.CalendarRpDto;
import com.sun.tingle.calendar.service.CalendarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/calendar")
public class CalendarController {

    @Autowired
    CalendarService calendarService;

    @PostMapping
    public ResponseEntity<CalendarRpDto> insertCalendar(@RequestBody Map<String,String> map) {
        String calendarCode = getRandomSentence();
//        map.put("calendarCode",calendarCode);
        String memberId = map.get("memberId");
        String calendarName = map.get("calendarName");
        CalendarRpDto calendarRpDto =  calendarService.insertCalendar(calendarCode,calendarName,memberId);
        return new ResponseEntity<CalendarRpDto>(calendarRpDto,HttpStatus.OK);
    }

    @DeleteMapping("{calendarCode}")
    public ResponseEntity<Void> deleteCalendar(@PathVariable("calendarCode") String calendarCode){
        HttpStatus httpStatus = HttpStatus.NO_CONTENT;
        try{
            calendarService.deleteCalendar(calendarCode);
        }
        catch (Exception e){
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
            return new ResponseEntity<Void>(httpStatus);
        }
        return new ResponseEntity<Void>(httpStatus);
    }

    @GetMapping("{calendarCode}")
    public ResponseEntity<CalendarRpDto> selectCalendar(@PathVariable("calendarCode") String calendarCode) {
        CalendarRpDto calendarRpDto = calendarService.selectCalendar(calendarCode);
        if(calendarRpDto == null) {
            System.out.println("null입니다.");
            return new ResponseEntity<CalendarRpDto>(calendarRpDto,HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<CalendarRpDto>(calendarRpDto,HttpStatus.OK);
    }


    @PutMapping("{calendarCode}")
    public ResponseEntity<CalendarRpDto> updateCalendar(@PathVariable("calendarCode") String calendarCode,
                                                         @RequestBody Map<String,String> map) {
        String calendarName = map.get("calendarName");
        CalendarRpDto calendarRpDto = calendarService.updateCalendar(calendarCode,calendarName);
        return new ResponseEntity<CalendarRpDto>(calendarRpDto,HttpStatus.OK);
    }


    @PostMapping("/share")
    public ResponseEntity<CalendarRpDto> insertShareCalendar(@RequestBody Map<String,String> map) {
        String calendarCode = map.get("calendarCode");
        String memberId = map.get("memberId");
        Map<String,Object> map2 = calendarService.insertShareCalendar(calendarCode,memberId);
        int flag = (Integer)map2.get("flag");
        CalendarRpDto calendarRpDto = (CalendarRpDto)map2.get("calendarRpDto");
        if(flag == -1) { // 애초에 등록 안된 달력일 때
            return new ResponseEntity<CalendarRpDto>(calendarRpDto,HttpStatus.NO_CONTENT);
        }
        else if(flag == -2) { // 이미 공유 달력에 등록되어 있을 때
            return new ResponseEntity<CalendarRpDto>(calendarRpDto,HttpStatus.CONFLICT);
        }
            //공유 성공했을 때
        return new ResponseEntity<CalendarRpDto>(calendarRpDto,HttpStatus.CREATED);
    }

    @DeleteMapping("/share/{calendarCode}")
    public ResponseEntity<Void> deleteShareCalendar(@PathVariable("calendarCode") String calendarCode) {
        String memberId = "audwns11111"; /// 임시 !! 나중에 토큰에서 아이디 뽑을 거임
        try {
            calendarService.deleteShareCalendar(calendarCode,memberId);
            return new ResponseEntity<Void>(HttpStatus.NO_CONTENT); //삭제가 됐을 떄
        }
        catch (Exception e) {
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR); //삭제할 캘린더가 없을 때
        }
    }

    @GetMapping("/every/calendars")
    public ResponseEntity<Map<String,List<CalendarRpDto>>> selectEveryCalendarList() {
        String memberId = "audwns102";
        Map<String,List<CalendarRpDto>> map = new HashMap<>();
        List<CalendarRpDto> list = calendarService.getMyCalendarList(memberId);
        List<CalendarRpDto> list2 = calendarService.getShareCalendarList(memberId);

        System.out.println(list.size());
        System.out.println(list2.size());

        map.put("myCalendar",list);
        map.put("shareCalendar",list2);

        return new ResponseEntity<Map<String,List<CalendarRpDto>>>(map,HttpStatus.OK);
    }


    @GetMapping("/my/calendars")
    public ResponseEntity<List<CalendarRpDto>> selectMyCalendarList() {
        String memberId = "audwns102";
        List<CalendarRpDto> list = calendarService.getMyCalendarList(memberId);
        if(list == null) {
            return new ResponseEntity<List<CalendarRpDto>>(list,HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<List<CalendarRpDto>>(list,HttpStatus.OK);
    }

    @GetMapping("/share/calendars")
    public ResponseEntity<List<CalendarRpDto>> selectShareCalendarList() {
        String memberId = "audwns102";
        List<CalendarRpDto> list = calendarService.getShareCalendarList(memberId);
        if(list == null) {
            return new ResponseEntity<List<CalendarRpDto>>(list,HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<List<CalendarRpDto>>(list,HttpStatus.OK);
    }




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

}
