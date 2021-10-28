package com.sun.tingle.chat.dto;


import com.sun.tingle.chat.entity.ChatRoom;
import lombok.Builder;
import lombok.Data;

@Data
public class MemberChatRoomResponseDto {
    private String room_id;
    private Long user_id;

    public static MemberChatRoomResponseDto of(ChatRoom chatRoom, Long user_id) {
        return MemberChatRoomResponseDto.builder()
                .room_id(chatRoom.getId())
                .user_id(user_id)
                .build();
    }

    @Builder
    public MemberChatRoomResponseDto(String room_id, Long user_id) {
        this.room_id = room_id;
        this.user_id = user_id;
    }
}
