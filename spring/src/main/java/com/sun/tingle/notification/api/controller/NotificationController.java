package com.sun.tingle.notification.api.controller;

import com.sun.tingle.member.api.dto.TokenInfo;
import com.sun.tingle.member.util.JwtUtil;
import com.sun.tingle.notification.api.service.NotificationService;
import com.sun.tingle.notification.db.entity.NotificationCheckEntity;
import com.sun.tingle.notification.db.entity.NotificationEntity;
import com.sun.tingle.notification.db.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.NoSuchElementException;

@Slf4j
@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/notification")
public class NotificationController {
    private final NotificationService notificationService;

    private final JwtUtil jwtUtil;

    @GetMapping(value = "/subscribe/{id}")
    public SseEmitter subscribe(@PathVariable Long id, HttpServletResponse response) {
        response.addHeader("X-Accel-Buffering", "no");
        return notificationService.subscribe(String.valueOf(id));
    }

    @GetMapping(value= "/subscribe/calendar/{calendarCode}")
    public SseEmitter subscribe2(@PathVariable("calendarCode") String calendarCode, HttpServletResponse response){
        response.addHeader("X-Accel-Buffering", "no");
        return notificationService.subscribe(calendarCode);
    }

    @GetMapping
    public ResponseEntity<?> getNotifications(HttpServletRequest request) {
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);
        log.info(token);
        TokenInfo tokenInfo = jwtUtil.getClaimsFromJwt(token.substring("Bearer ".length()));

        try{
            List<NotificationEntity> notifications = notificationService.getNotifications(tokenInfo.getId());
            log.info("알림 리스트 반환");
            return new ResponseEntity<List<NotificationEntity>>(notifications, HttpStatus.OK);
        }catch(Exception e){
            log.warn("알림 리스트 반환 에러");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{notificationId}")
    public ResponseEntity<?> checkNotification(HttpServletRequest request, @PathVariable Long notificationId){
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);
        TokenInfo tokenInfo = jwtUtil.getClaimsFromJwt(token.substring("Bearer ".length()));

        notificationService.checkNotification(notificationId, tokenInfo.getId());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{notificationId}")
    public ResponseEntity<?> getNotifications(HttpServletRequest request, @PathVariable Long notificationId) {
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);
        TokenInfo tokenInfo = jwtUtil.getClaimsFromJwt(token.substring("Bearer ".length()));

        NotificationEntity notificationEntity = notificationService.getNotification(notificationId);

        if(notificationEntity.getType().equals("invite")){
            notificationService.deleteNotification(notificationEntity.getId());
        }else{
            NotificationCheckEntity notificationCheckEntity = notificationService.getNotificationCheck(notificationEntity.getId(), tokenInfo.getId());
            notificationService.deleteNotificationCheck(notificationCheckEntity.getId());
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
