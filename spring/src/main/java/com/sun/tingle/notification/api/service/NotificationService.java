package com.sun.tingle.notification.api.service;

import com.sun.tingle.member.api.dto.TokenInfo;
import com.sun.tingle.mission.db.entity.MissionEntity;
import com.sun.tingle.mission.db.repo.MissionRepository;
import com.sun.tingle.notification.db.entity.NotificationEntity;
import com.sun.tingle.notification.db.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    private final MissionRepository missionRepository;

    public SseEmitter subscribe(String Separator) {
        //lastEventId를 구분하기 위해 id+밀리초
        String id = Separator + "_" + System.currentTimeMillis();

        // EventStream 생성 후 10분 경과시 제거
        // 클라이언트는 연결 종료 인지 후 EventStream 자동 재생성 요청
        SseEmitter emitter = new SseEmitter(DEFAULT_TIMEOUT);
        CLIENTS.put(id, emitter);

        emitter.onTimeout(() -> CLIENTS.remove(id));
        emitter.onCompletion(() -> CLIENTS.remove(id));

        // 503 에러를 방지하기 위한 더미 이벤트 전송
        sendToClient(emitter, String.valueOf(Separator), "EventStream Created. [userId=" + id + "]");

        return emitter;
    }

    public void sendInvite(TokenInfo sender, String calendarCode, Long inviteeId) {
//        SseEmitter sseEmitter = CLIENTS.get(inviteeId);

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

        notificationEntity = notificationRepository.save(notificationEntity);

        for(Map.Entry<String, SseEmitter> entry : CLIENTS.entrySet()){
            if(entry.getKey().contains(String.valueOf(inviteeId))){
                log.info(entry.getKey() + " " + entry.getValue());
                sendToClient(entry.getValue(), String.valueOf(inviteeId), notificationEntity);
            }
        }


//        sendToClient(sseEmitter, String.valueOf(inviteeId), calendarCode);
    }

    public void sendNotifyChange(TokenInfo sender,String calendarCode,String type, Long missionId) {
        Date now = new Date();
        MissionEntity m = missionRepository.findByMissionId(missionId);
        NotificationEntity notificationEntity = NotificationEntity.builder()
                .type(type)
                .calendarCode(calendarCode)
                .senderId(sender.getId())
                .sendDate(now)
                .sendTime(now)
                .missionEntity(m)
                .build();

        notificationEntity = notificationRepository.save(notificationEntity);
        for(Map.Entry<String, SseEmitter> entry : CLIENTS.entrySet()){
            if(entry.getKey().contains(calendarCode)){
                log.info(entry.getKey() + " " + entry.getValue());
                sendToClient(entry.getValue(), calendarCode, notificationEntity);
            }
        }
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

    public NotificationEntity getNotification(Long id){
        return notificationRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    public List<NotificationEntity> getNotifications(Long id){
        return notificationRepository.findALLByReceiverId(id).orElseThrow(NoSuchElementException::new);
    }

    public void deleteNotification(Long notificationId){
        notificationRepository.delete(
                notificationRepository.findById(notificationId).orElseThrow(NoSuchElementException::new)
        );
    }
}
