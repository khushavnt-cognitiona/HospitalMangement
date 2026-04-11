package com.hms.service.impl;

import com.hms.entity.AuditLog;
import com.hms.repository.AuditRepository;
import com.hms.service.AuditService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuditServiceImpl implements AuditService {

    private final AuditRepository repository;

    @Override
    public void log(String action, String performedBy, String details) {
        AuditLog auditLog = AuditLog.builder()
                .action(action)
                .performedBy(performedBy)
                .details(details)
                .timestamp(LocalDateTime.now())
                .build();
        repository.save(auditLog);
    }

    @Override
    public List<AuditLog> getAllAuditLogs() {
        return repository.findAllByOrderByTimestampDesc();
    }
}
