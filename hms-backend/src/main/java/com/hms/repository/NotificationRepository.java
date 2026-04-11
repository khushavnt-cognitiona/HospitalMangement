package com.hms.repository;

import com.hms.entity.Notification;
import com.hms.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUser(User user);
    List<Notification> findByUserOrderByTimestampDesc(User user);
}
