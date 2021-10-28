package com.sun.tingle.chat.dto;

import com.sun.tingle.chat.entity.ChatMessage;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;


@Data
public class ChatMessageResponseDto {
    private String content;
    private Long sender_id;
    private String pic_uri;
    private String nickname;
    private LocalDateTime sentTime;

    public static ChatMessageResponseDto of(ChatMessage chatMessage) {
        return ChatMessageResponseDto.builder()
                .content(chatMessage.getContent())
                .nickname(chatMessage.getSender().getName())
                .pic_uri(chatMessage.getSender().getProfileImage())
                .sender_id(chatMessage.getSender().getId())
                .sentTime(chatMessage.getSentTime())
                .build();
    }

    @Builder
    public ChatMessageResponseDto(String content, Long sender_id, String pic_uri, String nickname, LocalDateTime sentTime) {
        this.content = content;
        this.sender_id = sender_id;
        this.pic_uri = pic_uri;
        this.nickname = nickname;
        this.sentTime = sentTime;
    }
}
