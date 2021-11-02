package com.sun.tingle.chat.dto;

import com.sun.tingle.chat.entity.ChatMessage;
import com.sun.tingle.member.db.entity.MemberEntity;
import com.sun.tingle.member.db.repository.MemberRepository;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class ChatMessageResponseDto {
    private String content;
    private Long sender_id;
    private String pic_uri;
    private String nickname;
    private LocalDateTime sentTime;
    private String room_id;
    private String fileName;

    public static ChatMessageResponseDto of(MemberRepository memberRepository, ChatMessage chatMessage) {
//        MemberRepository memberRepository;
        MemberEntity memberEntity = memberRepository.getById(chatMessage.getSender());
        return ChatMessageResponseDto.builder()
                .content(chatMessage.getContent())
                .nickname(memberEntity.getName())
                .pic_uri(memberEntity.getProfileImage())
                .sender_id(memberEntity.getId())
                .sentTime(chatMessage.getSentTime())
                .room_id(chatMessage.getChatRoom().getId())
                .fileName(chatMessage.getFile_id())
                .build();
//        return ChatMessageResponseDto.builder()
//                .room_id(chatMessage.getChatRoom().getId())
//                .content(chatMessage.getContent())
//                .nickname(chatMessage.getSender().getName())
//                .pic_uri(chatMessage.getSender().getProfileImage())
//                .sender_id(chatMessage.getSender().getId())
//                .sentTime(chatMessage.getSentTime())
//                .build();
    }

//    @Builder
//    public ChatMessageResponseDto(String content, Long sender_id, String pic_uri, String nickname, LocalDateTime sentTime, String room_id) {
//        this.content = content;
//        this.sender_id = sender_id;
//        this.pic_uri = pic_uri;
//        this.nickname = nickname;
//        this.sentTime = sentTime;
//        this.room_id = room_id;
//    }
}
