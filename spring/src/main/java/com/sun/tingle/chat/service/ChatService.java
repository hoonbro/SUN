package com.sun.tingle.chat.service;

import com.sun.tingle.chat.dto.ChatMessageRequestDto;
import com.sun.tingle.chat.dto.ChatMessageResponseDto;
import com.sun.tingle.chat.dto.ChatRoomResponseDto;
import com.sun.tingle.chat.dto.MemberChatRoomResponseDto;
import com.sun.tingle.chat.entity.ChatMessage;
import com.sun.tingle.chat.entity.ChatRoom;
import com.sun.tingle.chat.repository.ChatMessageRepository;
import com.sun.tingle.chat.repository.ChatRoomRepository;
import com.sun.tingle.chat.util.SecurityUtil;
import com.sun.tingle.member.db.entity.MemberEntity;
import com.sun.tingle.member.db.repository.MemberRepository;
import com.sun.tingle.member.util.JwtUtil;
import com.sun.tingle.mission.db.entity.MissionEntity;
import com.sun.tingle.mission.db.repo.MissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;


@Service
@RequiredArgsConstructor
public class ChatService {
    @Autowired
    private KafkaSenderService kafkaSenderService;

    @Autowired
    private KafkaReceiverService kafkaReceiverService;

    private final JwtUtil tokenProvider;
    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final MissionRepository missionRepository;

    @Autowired
    MemberRepository memberRepository;

    private static String BOOT_TOPIC = "kafka-chat";

    @Transactional
    public void sendMessage(ChatMessageRequestDto chatMessageRequestDto, String token, Long mid) {
        Long userid = tokenProvider.getIdFromJwt(token);
        MemberEntity user = memberRepository.findById(userid).orElseThrow(() -> new NullPointerException("잘못된 사용자 토큰입니다!"));
        MissionEntity missionEntity = missionRepository.findById(mid).orElseThrow(() -> new NullPointerException("존재하지 않는 mission입니다!"));
        String roomid = getRoomId(mid);
        Optional<ChatRoom> chatRoom = chatRoomRepository.findById(roomid);
        ChatMessage message;
        if (chatRoom.isEmpty()) {
            ChatRoom inner_chatroom = createChatRoom(roomid, missionEntity);
            chatRoomRepository.save(inner_chatroom);
            message = chatMessageRequestDto.toChatMessage(user, inner_chatroom);
        } else {
            message = chatMessageRequestDto.toChatMessage(user, chatRoom.get());
        }
        chatMessageRepository.save(message);
        kafkaSenderService.send(BOOT_TOPIC, message);
    }

    @Transactional
    public ChatRoom createChatRoom(String roomid, MissionEntity mid) {
        return ChatRoom.builder()
                .id(roomid)
                .mission_id(mid)
                .build();
    }

    @Transactional(readOnly = true)
    public Page<ChatMessageResponseDto> getHistory(String roomid, Pageable pageable) {
        MemberEntity member = memberRepository.findById(SecurityUtil.getCurrentMemberId()).orElseThrow(() -> new NullPointerException("잘못된 토큰입니다."));
        ChatRoom chatRoom = chatRoomRepository.findById(roomid).orElseThrow(() -> new NullPointerException("존재하지 않는 채팅방입니다!"));
        Page<ChatMessage> chatMessages = chatMessageRepository.findAllByChatRoom(chatRoom, pageable);
        return chatMessages.map(m -> ChatMessageResponseDto.of(m));
    }

    @Transactional(readOnly = true)
    public List<ChatRoomResponseDto> getChattingRooms() throws Exception {
        MemberEntity user = memberRepository.findById(SecurityUtil.getCurrentMemberId()).orElseThrow(() -> new NullPointerException("잘못된 토큰입니다."));
        List<ChatRoom> chatRoomsUser = chatRoomRepository.findAllByUser(user);
        List<ChatRoom> chatRoomsOther = chatRoomRepository.findAllByOther(user);
        List<ChatRoomResponseDto> chatRoomResponseDtos = new ArrayList<>();
        for (ChatRoom chatRoom: chatRoomsUser) {
            chatRoomResponseDtos.add(ChatRoomResponseDto.ofOther(chatRoom));
        }
        for (ChatRoom chatRoom: chatRoomsOther) {
            chatRoomResponseDtos.add(ChatRoomResponseDto.ofUser(chatRoom));
        }
        return chatRoomResponseDtos;
    }

    @Transactional
    public MemberChatRoomResponseDto getChatroomId(Long mid) {
        MemberEntity user = memberRepository.findById(SecurityUtil.getCurrentMemberId()).orElseThrow(() -> new NullPointerException("잘못된 사용자 토큰입니다!"));
        MissionEntity missionEntity = missionRepository.findById(mid).orElseThrow(() -> new NullPointerException("존재하지 않는 mission입니다!"));
        String roomid = getRoomId(mid);
        Optional<ChatRoom> chatRoom = chatRoomRepository.findById(roomid);
        if (chatRoom.isEmpty()) {

            ChatRoom inner_chatroom = createChatRoom(roomid, missionEntity);
            chatRoomRepository.save(inner_chatroom);
            return MemberChatRoomResponseDto.of(inner_chatroom, missionEntity);
        } else {
            return MemberChatRoomResponseDto.of(chatRoom.get(), missionEntity);
        }
    }

    private String getRoomId(Long mid) {
        String roomid = Long.toString(mid);
        return roomid;
    }
}
