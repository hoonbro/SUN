package com.sun.tingle.notification.api.controller;

import com.sun.tingle.notification.api.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/notification")
public class NotificationController {
    private final NotificationService notificationService;

    @GetMapping(value = "/subscribe/{id}")
    public SseEmitter subscribe(@PathVariable Long id) {
        return notificationService.subscribe(id);
    }
}
