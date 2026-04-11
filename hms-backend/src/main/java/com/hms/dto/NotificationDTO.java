package com.hms.dto;

import com.hms.entity.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationDTO {
    private Long id;
    private Long userId;
    private String message;
    private NotificationType type;
    private LocalDateTime timestamp;
    private boolean read;
}
