package com.sun.tingle.chat.dto;

import com.sun.tingle.chat.entity.ChatRoom;
import lombok.Builder;
import lombok.Data;

@Data
public class ChatRoomResponseDto {
    private String id;
    private Long mission_id;

    public static ChatRoomResponseDto of(ChatRoom chatRoom) {
        return ChatRoomResponseDto.builder()
                .id(chatRoom.getId())
                .mission_id(chatRoom.getMission().getMissionId())
                .build();
    }

    @Builder
    public ChatRoomResponseDto(String id, Long mission_id) {
        this.id = id;
        this.mission_id = mission_id;
    }

}
