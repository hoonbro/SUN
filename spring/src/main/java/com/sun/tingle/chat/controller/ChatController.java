package com.sun.tingle.chat.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.http.ResponseEntity;
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

    @MessageMapping("/user/{id}")
    @SendTo("/room/{id}")
    public void sendMessage(ChatMessageRequestDto chatMessageRequestDto, @Header("Authorization") String token, @DestinationVariable Long id) throws Exception {
        chatService.sendMessage(chatMessageRequestDto, token, id);
    }

    @GetMapping("/chatroom/{id}")
    public ResponseEntity<Page<ChatMessageResponseDto>> getChattingHistory(@PathVariable("id") Long id,
                                                                           @PageableDefault(size = 10) @SortDefault(sort = "sentTime", direction = Sort.Direction.DESC) Pageable pageable) throws Exception {
        return ResponseEntity.ok(chatService.getHistory(id, pageable));
    }

    @GetMapping("/chatroom")
    public ResponseEntity<List<ChatRoomResponseDto>> getChattingRooms() throws Exception {
        return ResponseEntity.ok(chatService.getChattingRooms());
    }

    @GetMapping("/member/{email}")
    public ResponseEntity<MemberChatRoomResponse> getMemberChat(@PathVariable("email") String email) throws Exception {
        return ResponseEntity.ok(chatService.getChatroomId(email));
    }
}
