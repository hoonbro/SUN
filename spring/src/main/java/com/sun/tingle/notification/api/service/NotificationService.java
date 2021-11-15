package com.sun.tingle.notification.api.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationService {
    private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;

    private static final Map<Long, SseEmitter> CLIENTS = new ConcurrentHashMap<>();

    public SseEmitter subscribe(Long id) {
        //lastEventId를 구분하기 위해 id+밀리초
//        String id = userId + "_" + System.currentTimeMillis();

        SseEmitter emitter = new SseEmitter();
        CLIENTS.put(id, emitter);

        emitter.onTimeout(() -> CLIENTS.remove(id));
        emitter.onCompletion(() -> CLIENTS.remove(id));

        // 503 에러를 방지하기 위한 더미 이벤트 전송
        sendToClient(emitter, String.valueOf(id), "EventStream Created. [userId=" + id + "]");

        return emitter;
    }

    public void sendInvite(String calendarCode, Long inviteeId) {
        SseEmitter sseEmitter = CLIENTS.get(inviteeId);
        sendToClient(sseEmitter, String.valueOf(inviteeId), null);
    }

    private void sendToClient(SseEmitter emitter, String id, Object data) {
            Set<String> deadIds = new HashSet<>();

            try {
                emitter.send(SseEmitter.event()
                        .id(id)
                        .name("sse")
                        .data(data));
            } catch (IOException exception) {
                deadIds.add(id);
                log.warn("disconnected id : {}", id);
        }

        deadIds.forEach(CLIENTS::remove);
    }
}
