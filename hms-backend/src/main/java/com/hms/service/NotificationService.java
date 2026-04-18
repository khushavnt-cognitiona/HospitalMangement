package com.hms.service;

import com.hms.entity.Notification;
import com.hms.entity.User;
import com.hms.entity.NotificationType;
import java.util.List;

public interface NotificationService {
    List<Notification> getNotificationsForUser(User user);
    void markAsRead(Long id);
    Notification createNotification(User user, String message, NotificationType type);
}
