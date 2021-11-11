package com.sun.tingle.calendar.controller;


import com.sun.tingle.calendar.db.entity.CalendarEntity;
import com.sun.tingle.calendar.requestdto.NotifyChangeRqDto;
import com.sun.tingle.calendar.requestdto.ShareCalendarRqDto;
import com.sun.tingle.calendar.responsedto.CalendarRpDto;
import com.sun.tingle.calendar.service.CalendarService;
import com.sun.tingle.member.api.dto.TokenInfo;
import com.sun.tingle.member.util.JwtUtil;
import com.sun.tingle.notification.api.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/calendar")
@RequiredArgsConstructor
@CrossOrigin("*")

public class CalendarController {
    private final CalendarService calendarService;

    private final JwtUtil jwtUtil;

    private final NotificationService notificationService;

    @PostMapping
    public ResponseEntity<CalendarRpDto> insertCalendar(HttpServletRequest request, @RequestBody Map<String,String> map) {
        String calendarCode = calendarService.getRandomSentence();
        String token =request.getHeader(HttpHeaders.AUTHORIZATION);
        Long id = jwtUtil.getIdFromJwt(token.substring("Bearer ".length()));
        String calendarName = map.get("calendarName");
        CalendarRpDto calendarRpDto =  calendarService.insertCalendar(calendarCode,calendarName,id);
        if(calendarRpDto == null) {
            return new ResponseEntity<CalendarRpDto>(calendarRpDto,HttpStatus.CONFLICT);
        }
        return new ResponseEntity<CalendarRpDto>(calendarRpDto,HttpStatus.CREATED);
    }

    @DeleteMapping("{calendarCode}")
    public ResponseEntity<Void> deleteCalendar(HttpServletRequest request,@PathVariable("calendarCode") String calendarCode){
        HttpStatus httpStatus = HttpStatus.NO_CONTENT;
        String token =request.getHeader(HttpHeaders.AUTHORIZATION);
        Long id = jwtUtil.getIdFromJwt(token.substring("Bearer ".length()));
        try{
            int result = calendarService.deleteCalendar(calendarCode,id);
            if(result ==1) { // 캘린더 등록한 사람이 아니라서 권한 없을 때
                return new ResponseEntity<Void>(HttpStatus.UNAUTHORIZED);
            }
            else {  // 삭제 완료
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
            }
        }
        catch (Exception e){
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
            return new ResponseEntity<Void>(httpStatus);
        }
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
    public ResponseEntity<CalendarRpDto> updateCalendar(HttpServletRequest request,@PathVariable("calendarCode") String calendarCode,
                                                         @RequestBody Map<String,String> map) {
        String token =request.getHeader(HttpHeaders.AUTHORIZATION);
        Long id = jwtUtil.getIdFromJwt(token.substring("Bearer ".length()));
        String calendarName = map.get("calendarName");
        CalendarRpDto calendarRpDto = calendarService.updateCalendar(calendarCode,calendarName,id);
        if(calendarRpDto == null) {
            return new ResponseEntity<CalendarRpDto>(calendarRpDto,HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<CalendarRpDto>(calendarRpDto,HttpStatus.CREATED);
    }


    @PostMapping("/share")
    public ResponseEntity<CalendarRpDto> insertShareCalendar(HttpServletRequest request, @RequestBody ShareCalendarRqDto shareCalendarRqDto) {
        String token =request.getHeader(HttpHeaders.AUTHORIZATION);
        Long id = jwtUtil.getIdFromJwt(token.substring("Bearer ".length()));

        // 알림 삭제
        if(shareCalendarRqDto.getNotificationId() != null)
            notificationService.deleteNotification(shareCalendarRqDto.getNotificationId());

        Map<String,Object> map2 = calendarService.insertShareCalendar(shareCalendarRqDto.getCalendarCode(),id);
        int flag = (Integer)map2.get("flag");
        CalendarRpDto calendarRpDto = (CalendarRpDto)map2.get("calendarRpDto");
        if(flag == -1) { // 애초에 등록 안된 달력일
            // 때
            return new ResponseEntity<CalendarRpDto>(calendarRpDto,HttpStatus.NO_CONTENT);
        }
        else if(flag == -2) { // 이미 공유 달력에 등록되어 있을 때
            return new ResponseEntity<CalendarRpDto>(calendarRpDto,HttpStatus.CONFLICT);
        }
        //공유 성공했을 때
        notificationService.sendNotifyChange(id, shareCalendarRqDto.getCalendarCode(), "calendar_in", null);
        return new ResponseEntity<CalendarRpDto>(calendarRpDto,HttpStatus.CREATED);
    }

    @DeleteMapping("/share/{calendarCode}")
    public ResponseEntity<Void> deleteShareCalendar(HttpServletRequest request,@PathVariable("calendarCode") String calendarCode) {
        String token =request.getHeader(HttpHeaders.AUTHORIZATION);
        Long id = jwtUtil.getIdFromJwt(token.substring("Bearer ".length()));
        try {
            notificationService.sendNotifyChange(id, calendarCode, "calendar_out", null);
            calendarService.deleteShareCalendar(calendarCode,id);
            return new ResponseEntity<Void>(HttpStatus.NO_CONTENT); //삭제가 됐을 떄
        }
        catch (Exception e) {
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR); //삭제할 캘린더가 없을 때
        }
    }

    @GetMapping("/every/calendars")
    public ResponseEntity<Map<String,List<CalendarRpDto>>> selectEveryCalendarList(HttpServletRequest request) {
        String token =request.getHeader(HttpHeaders.AUTHORIZATION);
        Long id = jwtUtil.getIdFromJwt(token.substring("Bearer ".length()));
        Map<String,List<CalendarRpDto>> map = new HashMap<>();
        List<CalendarRpDto> list = calendarService.getMyCalendarList(id);
        List<CalendarRpDto> list2 = calendarService.getShareCalendarList(id);

        System.out.println(list.size());
        System.out.println(list2.size());

        map.put("myCalendar",list);
        map.put("shareCalendar",list2);

        return new ResponseEntity<Map<String,List<CalendarRpDto>>>(map,HttpStatus.OK);
    }


    @GetMapping("/my/calendars")
    public ResponseEntity<List<CalendarRpDto>> selectMyCalendarList(HttpServletRequest request) {
        String token =request.getHeader(HttpHeaders.AUTHORIZATION);
        Long id = jwtUtil.getIdFromJwt(token.substring("Bearer ".length()));
        List<CalendarRpDto> list = calendarService.getMyCalendarList(id);
        if(list == null) {
            return new ResponseEntity<List<CalendarRpDto>>(list,HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<List<CalendarRpDto>>(list,HttpStatus.OK);
    }

    @GetMapping("/share/calendars")
    public ResponseEntity<List<CalendarRpDto>> selectShareCalendarList(HttpServletRequest request) {
        String token =request.getHeader(HttpHeaders.AUTHORIZATION);
        Long id = jwtUtil.getIdFromJwt(token.substring("Bearer ".length()));
        List<CalendarRpDto> list = calendarService.getShareCalendarList(id);
        if(list == null) {
            return new ResponseEntity<List<CalendarRpDto>>(list,HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<List<CalendarRpDto>>(list,HttpStatus.OK);
    }

    @PostMapping("/notifyChange")
    public ResponseEntity<Void> testings(HttpServletRequest request,@RequestBody NotifyChangeRqDto notifyChangeRqDto) {
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);
        TokenInfo tokenInfo = jwtUtil.getClaimsFromJwt(token.substring("Bearer ".length()));
        notificationService.sendNotifyChange(tokenInfo.getId(),notifyChangeRqDto.getCalendarCode(),notifyChangeRqDto.getType(), notifyChangeRqDto.getMissionId());

        return new ResponseEntity<Void>(HttpStatus.OK);
    }
}
