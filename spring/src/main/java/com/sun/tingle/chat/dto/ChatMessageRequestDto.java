package com.sun.tingle.chat.dto;

import com.sun.tingle.chat.entity.ChatMessage;
import com.sun.tingle.chat.entity.ChatRoom;
import com.sun.tingle.member.db.entity.MemberEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessageRequestDto {
    private String content;

    public ChatMessage toChatMessage(MemberEntity sender, ChatRoom inner_chatroom) {
        return ChatMessage.builder()
                .content(content)
                .sender(sender)
                .sentTime(LocalDateTime.now())
                .chatRoom(inner_chatroom)
                .build();
    }
}
