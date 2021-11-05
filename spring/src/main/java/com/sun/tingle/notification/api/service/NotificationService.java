package com.sun.tingle.notification.api.service;

import com.sun.tingle.member.api.dto.TokenInfo;
import com.sun.tingle.member.api.dto.response.InviteResDto;
import com.sun.tingle.notification.db.entity.NotificationEntity;
import com.sun.tingle.notification.db.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jgroups.blocks.cs.Client;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationService {
    private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 10;

    private static final Map<String, SseEmitter> CLIENTS = new ConcurrentHashMap<>();

    private final NotificationRepository notificationRepository;

    public SseEmitter subscribe(Long userId) {
        log.info("구독 됐다");
        //lastEventId를 구분하기 위해 id+밀리초
        String id = userId + "_" + System.currentTimeMillis();

        // EventStream 생성 후 10분 경과시 제거
        // 클라이언트는 연결 종료 인지 후 EventStream 자동 재생성 요청
        SseEmitter emitter = new SseEmitter(DEFAULT_TIMEOUT);
        CLIENTS.put(id, emitter);

        emitter.onTimeout(() -> CLIENTS.remove(id));
        emitter.onCompletion(() -> CLIENTS.remove(id));

        // 503 에러를 방지하기 위한 더미 이벤트 전송
        sendToClient(emitter, String.valueOf(userId), "EventStream Created. [userId=" + id + "]");

        return emitter;
    }

    public void sendInvite(TokenInfo sender, String calendarCode, Long inviteeId) {
//        SseEmitter sseEmitter = CLIENTS.get(inviteeId);
        InviteResDto inviteResDto = InviteResDto.builder()
                .calenderCode(calendarCode)
                .senderName(sender.getName())
                .build();

        //디비 저장
        Date now = new Date();
        NotificationEntity notificationEntity = NotificationEntity.builder()
                .type("INVITE")
                .calendarCode(calendarCode)
                .senderId(sender.getId())
                .receiverId(inviteeId)
                .sendDate(now)
                .sendTime(now)
                .build();

        notificationRepository.save(notificationEntity);

        for(Map.Entry<String, SseEmitter> entry : CLIENTS.entrySet()){
            if(entry.getKey().contains(String.valueOf(inviteeId))){
                log.info(entry.getKey() + " " + entry.getValue());
                sendToClient(entry.getValue(), String.valueOf(inviteeId), inviteResDto);
            }
        }


//        sendToClient(sseEmitter, String.valueOf(inviteeId), calendarCode);
    }

    private void sendToClient(SseEmitter emitter, String id, Object data) {
            Set<String> deadIds = new HashSet<>();

            try {
                emitter.send(SseEmitter.event()
                        .id(id)
                        .name(id)
                        .data(data));
                log.info("보냈어 " + id);

            } catch (IOException exception) {
                deadIds.add(id);
                log.warn("disconnected id : {}", id);
        }

        deadIds.forEach(CLIENTS::remove);
    }
}
