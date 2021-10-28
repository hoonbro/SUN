package com.sun.tingle.chat.repository;

import com.sun.tingle.chat.entity.ChatRoom;
import com.sun.tingle.member.db.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, String> {
    List<ChatRoom> findAllByUser(MemberEntity user);
    List<ChatRoom> findAllByOther(MemberEntity other);
}
