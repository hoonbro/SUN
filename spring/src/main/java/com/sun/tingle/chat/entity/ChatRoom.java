package com.sun.tingle.chat.entity;

import com.sun.tingle.member.db.entity.MemberEntity;
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
    @JoinColumn(name = "user_id")
    private MemberEntity user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "other_id")
    private MemberEntity other;

    @Builder
    public ChatRoom(String id, MemberEntity user, MemberEntity other) {
        this.id = id;
        this.user = user;
        this.other = other;
    }
}
