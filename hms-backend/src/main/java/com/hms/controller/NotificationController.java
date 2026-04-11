package com.hms.controller;

import com.hms.entity.Notification;
import com.hms.entity.User;
import com.hms.repository.UserRepository;
import com.hms.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService service;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<Notification>> getMyNotifications() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow();
        return ResponseEntity.ok(service.getNotificationsForUser(user));
    }

    @PatchMapping("/{id}/read")
    public ResponseEntity<Void> markAsRead(@PathVariable("id") Long id) {
        service.markAsRead(id);
        return ResponseEntity.ok().build();
    }
}
