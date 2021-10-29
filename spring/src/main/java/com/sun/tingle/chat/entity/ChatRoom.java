package com.sun.tingle.chat.entity;

import com.sun.tingle.member.db.entity.MemberEntity;
import com.sun.tingle.mission.db.entity.MissionEntity;
import lombok.*;

import javax.persistence.*;


@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity(name = "tingle.chat_room")
public class ChatRoom {
    @Id
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mission_id")
    private MissionEntity mission_id;

    @Builder
    public ChatRoom(String id, MissionEntity mission_id) {
        this.id = id;
        this.mission_id = mission_id;
    }
}
