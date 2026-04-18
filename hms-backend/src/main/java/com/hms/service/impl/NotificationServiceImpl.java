package com.hms.service.impl;

import com.hms.entity.Notification;
import com.hms.entity.NotificationType;
import com.hms.entity.User;
import com.hms.repository.NotificationRepository;
import com.hms.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository repository;

    @Override
    public List<Notification> getNotificationsForUser(User user) {
        return repository.findByUser(user);
    }

    @Override
    public void markAsRead(Long id) {
        Notification notification = repository.findById(id).orElseThrow();
        notification.setReadStatus(true);
        repository.save(notification);
    }

    @Override
    public Notification createNotification(User user, String message, NotificationType type) {
        Notification notification = Notification.builder()
                .user(user)
                .message(message)
                .type(type)
                .readStatus(false)
                .timestamp(LocalDateTime.now())
                .build();
        return repository.save(notification);
    }
}
