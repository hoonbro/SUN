package com.sun.tingle.chat.entity;


import com.sun.tingle.member.db.entity.MemberEntity;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;


@Getter
@Setter
@ToString
@Entity(name = "chat_message")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatMessage {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    private String content;

    @Column(name = "sender_id")
    private Long sender;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_room_id")
    private ChatRoom chatRoom;

    @Column(name = "sent_time")
    private LocalDateTime sentTime;

//    @OneToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "file_id")
//    private DBFile dbFile;

    @Builder
    public ChatMessage(String content, Long sender, ChatRoom chatRoom, LocalDateTime sentTime) {
        this.content = content;
        this.sender = sender;
        this.chatRoom = chatRoom;
        this.sentTime = sentTime;
    }
}
