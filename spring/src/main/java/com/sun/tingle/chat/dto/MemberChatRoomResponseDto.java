package com.sun.tingle.chat.dto;


import com.sun.tingle.chat.entity.ChatRoom;
import com.sun.tingle.mission.db.entity.MissionEntity;
import lombok.Builder;
import lombok.Data;


@Data
public class MemberChatRoomResponseDto {
    private String room_id;
    private Long mission_id;
    private String title;

    public static MemberChatRoomResponseDto of(ChatRoom chatRoom, MissionEntity mission) {
        return MemberChatRoomResponseDto.builder()
                .room_id(chatRoom.getId())
                .mission_id(mission.getMissionId())
                .title(mission.getTitle())
                .build();
    }

    @Builder
    public MemberChatRoomResponseDto(String room_id, Long mission_id, String title) {
        this.room_id = room_id;
        this.mission_id = mission_id;
        this.title = title;
    }
}
