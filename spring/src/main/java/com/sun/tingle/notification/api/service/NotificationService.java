package com.sun.tingle.notification.api.service;

import com.sun.tingle.calendar.db.entity.CalendarEntity;
import com.sun.tingle.calendar.responsedto.CalendarRpDto;
import com.sun.tingle.calendar.service.CalendarService;
import com.sun.tingle.member.api.dto.TokenInfo;
import com.sun.tingle.member.api.dto.response.MemberResDto;
import com.sun.tingle.member.api.service.MemberService;
import com.sun.tingle.mission.db.entity.MissionEntity;
import com.sun.tingle.mission.db.repo.MissionRepository;
import com.sun.tingle.notification.db.entity.NotificationCheckEntity;
import com.sun.tingle.notification.db.entity.NotificationEntity;
import com.sun.tingle.notification.db.repository.NotificationCheckRepository;
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

    private final NotificationCheckRepository notificationCheckRepository;

    private final MissionRepository missionRepository;

    private final CalendarService calendarService;

    private final MemberService memberService;

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
        sendToClient(emitter, id, String.valueOf(Separator), "EventStream Created. [userId=" + id + "]");

        return emitter;
    }

    public void sendInvite(TokenInfo sender, String calendarCode, String type, Long inviteeId) throws Exception {
//        SseEmitter sseEmitter = CLIENTS.get(inviteeId);

        NotificationEntity inviteConflict = notificationRepository.findByCalendarCodeAndReceiverId(calendarCode, inviteeId);
        if(inviteConflict != null)
            throw new Exception();

        String calendarName = calendarService.selectCalendar(calendarCode).getCalendarName();
        //디비 저장
        Date now = new Date();
        NotificationEntity notificationEntity = NotificationEntity.builder()
                .type(type)
                .calendarCode(calendarCode)
                .calendarName(calendarName)
                .senderId(sender.getId())
                .sender(memberService.getMemberInfo(sender.getId()))
                .receiverId(inviteeId)
                .sendDate(now)
                .sendTime(now)
                .isCheck(false)
                .build();

        notificationEntity = notificationRepository.save(notificationEntity);

        for(Map.Entry<String, SseEmitter> entry : CLIENTS.entrySet()){
            if(entry.getKey().contains(String.valueOf(inviteeId))){
                log.info(entry.getKey() + " " + entry.getValue());
                sendToClient(entry.getValue(), entry.getKey(), String.valueOf(inviteeId), notificationEntity);
            }
        }


//        sendToClient(sseEmitter, String.valueOf(inviteeId), calendarCode);
    }

    public void sendNotifyChange(Long id,String calendarCode,String type, Long missionId) {
        Date now = new Date();
        MissionEntity m = missionRepository.findByMissionId(missionId);
        String calendarName = calendarService.selectCalendar(calendarCode).getCalendarName();
        NotificationEntity notificationEntity = NotificationEntity.builder()
                .type(type)
                .calendarCode(calendarCode)
                .calendarName(calendarName)
                .senderId(id)
                .sender(memberService.getMemberInfo(id))
                .sendDate(now)
                .sendTime(now)
                .isCheck(false)
                .mission(m)
                .missionId(missionId)
                .build();
        notificationEntity = notificationRepository.save(notificationEntity);

        //캘린더 구독하고 있는 모든 사람들을 알림체크 테이블이 넣음
        List<Long> list = calendarService.getMembersByCalendarCode(calendarCode);
        for(Long n : list){
            NotificationCheckEntity notificationCheckEntity = NotificationCheckEntity.builder()
                    .notificationId(notificationEntity.getId())
                    .memberId(n)
                    .isCheck(false)
                    .build();

            notificationCheckRepository.save(notificationCheckEntity);
        }

        for(Map.Entry<String, SseEmitter> entry : CLIENTS.entrySet()){
            if(entry.getKey().contains(calendarCode)){
                sendToClient(entry.getValue(), entry.getKey(), calendarCode, notificationEntity);
            }
        }
    }

    private void sendToClient(SseEmitter emitter, String key, String id, Object data) {
            Set<String> deadIds = new HashSet<>();

            try {
                emitter.send(SseEmitter.event()
                        .id(id)
                        .name(id)
                        .data(data));
                log.info("send to : " + id);

            } catch (IOException exception) {
                deadIds.add(key);
                log.warn("disconnected id : {}", key);
        }
        deadIds.forEach(CLIENTS::remove);
    }

    public NotificationEntity getNotification(Long id){
        return notificationRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    public NotificationCheckEntity getNotificationCheck(Long notificationId,Long memberId){
        return notificationCheckRepository.findByNotificationIdAndMemberId(notificationId, memberId);
    }

    public List<NotificationEntity> getNotifications(Long id){
        List<NotificationEntity> list = notificationRepository.findALLByReceiverId(id).orElseThrow(NoSuchElementException::new);

        //내 캘린더 관련 알림
        List<CalendarRpDto> myCalendarList = calendarService.getMyCalendarList(id);
        for(CalendarRpDto calendarRpDto : myCalendarList){
            List<NotificationEntity> calendarCodeList = notificationRepository.findAllByCalendarCodeAndReceiverIdIsNull(calendarRpDto.getCalendarCode());
            list.addAll(calendarCodeList);
        }
        log.info("내 캘린더 알림 조회");

        //공유 캘린더 관련 알림
        List<CalendarRpDto> shareCalendarList = calendarService.getShareCalendarList(id);
        for(CalendarRpDto calendarRpDto : shareCalendarList){
            List<NotificationEntity> calendarCodeList = notificationRepository.findAllByCalendarCodeAndReceiverIdIsNull(calendarRpDto.getCalendarCode());
            list.addAll(calendarCodeList);
        }
        log.info("공유 캘린더 알림 조회");

        Collections.sort(list, new Comparator<NotificationEntity>() {
            @Override
            public int compare(NotificationEntity o1, NotificationEntity o2) {
                if(o1.getSendDate().equals(o2.getSendDate())){
                    return o2.getSendTime().compareTo(o1.getSendTime());
                }
                return o2.getSendDate().compareTo(o1.getSendDate());
            }
        });

        for(int i = 0; i < list.size(); i++){
            NotificationEntity n = list.get(i);

            if(n.getType().equals("invite")) {
                n.setSender(memberService.getMemberInfo(n.getSenderId()));
                continue;
            }
            NotificationCheckEntity notificationCheckEntity = notificationCheckRepository.findByNotificationIdAndMemberId(n.getId(), id);
            if(notificationCheckEntity == null) {
                list.remove(i);
                continue;
            }
            n.setIsCheck(notificationCheckRepository.findByNotificationIdAndMemberId(n.getId(), id).getIsCheck());
            n.setSender(memberService.getMemberInfo(n.getSenderId()));
        }

        log.info("사용자에 맞게 알림 체크 여부 판단");
        list = setMissionIdList(list);
        return list;
    }

    public List<NotificationEntity> setMissionIdList(List<NotificationEntity> list) {
        int size = list.size();


        for(int i=0; i<size; i++) {
            Long id = list.get(i).getId();
            NotificationEntity notificationEntity = notificationRepository.findById(id).get();


            if(notificationEntity.getType().equals("invite") || notificationEntity.getType().equals("calendar_in") ||
            notificationEntity.getType().equals("calendar_out")) {
                continue;
            }
            notificationEntity.setMissionId(notificationEntity.getMission().getMissionId());
            list.set(i,notificationEntity);
        }


        return list;
    }


    public void deleteNotification(Long notificationId){
        notificationRepository.delete(
                notificationRepository.findById(notificationId).orElseThrow(NoSuchElementException::new)
        );
    }

    public void deleteNotificationCheck(Long notificationCheckId){
        notificationCheckRepository.delete(
                notificationCheckRepository.findById(notificationCheckId).orElseThrow(NoSuchElementException::new)
        );
    }

    public void checkNotification(Long notificationId, Long id){
        NotificationCheckEntity notificationCheckEntity = notificationCheckRepository.findByNotificationIdAndMemberId(notificationId, id);
        notificationCheckEntity.setIsCheck(true);
        notificationCheckRepository.save(notificationCheckEntity);
    }
}
