package com.sun.tingle.chat.dto;

import com.sun.tingle.chat.entity.ChatMessage;
import com.sun.tingle.file.db.entity.MissionFileEntity;
import com.sun.tingle.file.db.repo.MissionFileRepository;
import com.sun.tingle.file.responsedto.MissionFileRpDto;
import com.sun.tingle.member.db.entity.MemberEntity;
import com.sun.tingle.member.db.repository.MemberRepository;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Optional;


@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class ChatMessageResponseDto {
    private String content;
    private Long sender_id;
    private String pic_uri;
    private String nickname;
    private LocalDateTime sentTime;
    private String room_id;
    private String fileName;
    private String fileUuid;
    private String fileType;
    private String auth;

    public static ChatMessageResponseDto of(MemberRepository memberRepository, ChatMessage chatMessage) {
        MemberEntity memberEntity = memberRepository.getById(chatMessage.getSender());
        return ChatMessageResponseDto.builder()
                .content(chatMessage.getContent())
                .nickname(memberEntity.getName())
                .pic_uri(memberEntity.getProfileImage())
                .sender_id(memberEntity.getId())
                .sentTime(chatMessage.getSentTime())
                .room_id(chatMessage.getChatRoom().getId())
                .auth(memberEntity.getAuth())
                .build();
    }
    public static ChatMessageResponseDto of(MemberRepository memberRepository, ChatMessage chatMessage, MissionFileRepository missionFileRepository) {
        MemberEntity memberEntity = memberRepository.getById(chatMessage.getSender());
        if (chatMessage.getFile_id() != null) {
            Optional<MissionFileEntity> missionFileEntity = missionFileRepository.findById(chatMessage.getFile_id());
            return ChatMessageResponseDto.builder()
                    .content(chatMessage.getContent())
                    .nickname(memberEntity.getName())
                    .pic_uri(memberEntity.getProfileImage())
                    .sender_id(memberEntity.getId())
                    .sentTime(chatMessage.getSentTime())
                    .room_id(chatMessage.getChatRoom().getId())
                    .auth(memberEntity.getAuth())
                    .fileType(missionFileEntity.get().getType())
                    .fileUuid(missionFileEntity.get().getFileUuid())
                    .fileName(missionFileEntity.get().getFileName())
                    .build();
        }
        return ChatMessageResponseDto.builder()
                .content(chatMessage.getContent())
                .nickname(memberEntity.getName())
                .pic_uri(memberEntity.getProfileImage())
                .sender_id(memberEntity.getId())
                .sentTime(chatMessage.getSentTime())
                .room_id(chatMessage.getChatRoom().getId())
                .auth(memberEntity.getAuth())
                .build();
    }

    public static ChatMessageResponseDto of(MemberRepository memberRepository, ChatMessage chatMessage, MissionFileRpDto missionFile) {
        MemberEntity memberEntity = memberRepository.getById(chatMessage.getSender());
        return ChatMessageResponseDto.builder()
                .content(chatMessage.getContent())
                .nickname(memberEntity.getName())
                .pic_uri(memberEntity.getProfileImage())
                .sender_id(memberEntity.getId())
                .sentTime(chatMessage.getSentTime())
                .room_id(chatMessage.getChatRoom().getId())
                .fileName(missionFile.getFileName())
                .fileUuid(missionFile.getFileUuid())
                .fileType(missionFile.getType())
//                .fileUuid(missionFile.getFileUuid())
//                .fileType(missionFile.getFileType())
                .auth(memberEntity.getAuth())
                .build();
    }
}
