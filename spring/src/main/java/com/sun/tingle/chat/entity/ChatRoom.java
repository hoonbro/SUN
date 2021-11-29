package com.sun.tingle.chat.entity;

import com.sun.tingle.member.db.entity.MemberEntity;
import com.sun.tingle.mission.db.entity.MissionEntity;
import lombok.*;

import javax.persistence.*;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@Entity(name = "chat_room")
public class ChatRoom {
    @Id
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mission_id")
    private MissionEntity mission;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "chatRoom")
    private List<ChatMessage> chatMessageList;


    @Builder
    public ChatRoom(String id, MissionEntity mission) {
        this.id = id;
        this.mission = mission;
    }
}
