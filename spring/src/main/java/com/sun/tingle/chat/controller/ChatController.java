package com.sun.tingle.chat.controller;


import com.sun.tingle.chat.dto.ChatMessageRequestDto;
import com.sun.tingle.chat.dto.ChatMessageResponseDto;
import com.sun.tingle.chat.dto.ChatRoomResponseDto;
import com.sun.tingle.chat.dto.MemberChatRoomResponseDto;
import com.sun.tingle.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/messages")
public class ChatController {
    private final ChatService chatService;

    @MessageMapping("/mission/{mid}")
    @SendTo("/room/{id}")
    public void sendMessage(@DestinationVariable("mid") Long mid, ChatMessageRequestDto chatMessageRequestDto, @Header("Authorization") String token) throws Exception {
        chatService.sendMessage(chatMessageRequestDto, token, mid);
    }

    @GetMapping("/chatroom/{id}")
    public ResponseEntity<Page<ChatMessageResponseDto>> getChattingHistory(@PathVariable("id") String id,
                                                                           @PageableDefault(size = 10) @SortDefault(sort = "sentTime", direction = Sort.Direction.DESC) Pageable pageable) throws Exception {
        return ResponseEntity.ok(chatService.getHistory(id, pageable));
    }

    @GetMapping("/mission/{mid}")
    public ResponseEntity<MemberChatRoomResponseDto> getMemberChat(@PathVariable("mid") Long mid) throws Exception {
        return ResponseEntity.ok(chatService.getChatroomId(mid));
    }
}
