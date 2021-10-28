package com.sun.tingle.chat.service;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.tingle.chat.entity.ChatMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.HashMap;

@Service
public class KafkaReceiverService {
    private static final Logger LOGGER = LoggerFactory.getLogger(KafkaReceiverService.class);

    @Autowired
    private SimpMessagingTemplate template;

    @KafkaListener(id = "main-listener", topics = "kafka-chat")
    public void receive(ChatMessage message) throws Exception {
        LOGGER.info("message='{}'", message);
        HashMap<String, String> msg = new HashMap<>();
        msg.put("sentTime", message.getSentTime().format(DateTimeFormatter.ISO_DATE_TIME));
        msg.put("name", message.getSender().getName());
        msg.put("content", message.getContent());
        msg.put("pic_uri", message.getSender().getProfileImage());
        msg.put("sender_id", Long.toString(message.getSender().getId()));

        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(msg);

        this.template.convertAndSend("/room/" + message.getChatRoom().getId(), json);
    }
}
