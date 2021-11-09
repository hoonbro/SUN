package com.sun.tingle.chat.service;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.tingle.chat.dto.ChatMessageResponseDto;
import com.sun.tingle.chat.entity.ChatMessage;
import com.sun.tingle.member.db.entity.MemberEntity;
import com.sun.tingle.member.db.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class KafkaReceiverService {
    private static final Logger LOGGER = LoggerFactory.getLogger(KafkaReceiverService.class);

    private final MemberRepository memberRepository;

    @Autowired
    private SimpMessagingTemplate template;

    @KafkaListener(id = "main-listener", topics = "kafka-chat")
    public void receive(ChatMessageResponseDto message) throws Exception {
        LOGGER.info("message='{}'", message);
        HashMap<String, String> msg = new HashMap<>();
        msg.put("sentTime", message.getSentTime().format(DateTimeFormatter.ISO_DATE_TIME));
        msg.put("nickname", message.getNickname());
        msg.put("content", message.getContent());
        msg.put("pic_uri", message.getPic_uri());
        msg.put("room_id", message.getRoom_id());
        msg.put("auth", message.getAuth());
        msg.put("fileName", message.getFileName());
        msg.put("sender_id", Long.toString(message.getSender_id()));

        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(msg);

        this.template.convertAndSend("/room/" + message.getRoom_id(), json);
    }
}
