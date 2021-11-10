package com.sun.tingle.chat.dto;

import com.sun.tingle.chat.entity.ChatMessage;
import com.sun.tingle.chat.entity.ChatRoom;
import com.sun.tingle.file.responsedto.MissionFileRpDto;
import com.sun.tingle.member.db.entity.MemberEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessageRequestDto {
    private String content;
    private MultipartFile file;

    public ChatMessage toChatMessage(Long sender, ChatRoom inner_chatroom) {
        return ChatMessage.builder()
                .content(content)
                .sender(sender)
                .sentTime(LocalDateTime.now())
                .chatRoom(inner_chatroom)
                .build();
    }
    public ChatMessage toChatMessageFile(Long sender, ChatRoom inner_chatroom, String r) {
        return ChatMessage.builder()
                .sender(sender)
                .sentTime(LocalDateTime.now())
                .chatRoom(inner_chatroom)
                .file_id(r)
                .build();
    }
}
