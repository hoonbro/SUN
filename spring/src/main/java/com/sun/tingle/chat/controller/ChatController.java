package com.sun.tingle.chat.controller;


import com.sun.tingle.chat.dto.ChatMessageRequestDto;
import com.sun.tingle.chat.dto.ChatMessageResponseDto;
import com.sun.tingle.chat.dto.MemberChatRoomResponseDto;
import com.sun.tingle.chat.entity.ChatMessage;
import com.sun.tingle.chat.service.ChatService;
import com.sun.tingle.member.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
@RequestMapping("/messages")
public class ChatController {
    private final ChatService chatService;
    private final JwtUtil jwtUtil;

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

    @GetMapping("/chat/all")
    public ResponseEntity<Page<ChatMessageResponseDto>> getMemberChatAll(HttpServletRequest request, @PageableDefault(size = 10) @SortDefault(sort = "sentTime", direction = Sort.Direction.DESC) Pageable pageable) throws Exception {
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);
        Long id = jwtUtil.getIdFromJwt(token.substring("Bearer ".length()));
        return ResponseEntity.ok(chatService.getChatAll(id, pageable));
    }

//    @MessageMapping("/mission/{mid}/file")
    @PostMapping("/mission/{mid}/file")
    @SendTo("/room/{id}")
    public void sendFile(@RequestParam("file") MultipartFile file, @PathVariable("mid") Long mid) throws Exception {
        chatService.sendFile(file, mid);
    }
}
