package com.sun.tingle.notification.api.controller;

import com.sun.tingle.member.api.dto.TokenInfo;
import com.sun.tingle.member.util.JwtUtil;
import com.sun.tingle.notification.api.service.NotificationService;
import com.sun.tingle.notification.db.entity.NotificationEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import javax.servlet.http.HttpServletRequest;
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
    public SseEmitter subscribe(@PathVariable Long id) {
        return notificationService.subscribe(String.valueOf(id));
    }

    @GetMapping(value= "/subscribe/calendar/{calendarCode}")
    public SseEmitter subscribe2(@PathVariable("calendarCode") String calendarCode){ return notificationService.subscribe(calendarCode); }

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
        if(notificationEntity.getReceiverId() == tokenInfo.getId()) {
            try {
                notificationService.deleteNotification(notificationId);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }catch(NoSuchElementException e){
                log.error("해당 알림 없음");
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }else{
            // 사용자 아이디와 알림의 사용자 아이디가 다를 경우
            log.error("알림 삭제 권한 없음");
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}
