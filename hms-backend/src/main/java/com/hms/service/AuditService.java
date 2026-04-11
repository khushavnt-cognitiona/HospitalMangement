package com.hms.service;

import com.hms.entity.AuditLog;
import java.util.List;

public interface AuditService {
    void log(String action, String performedBy, String details);
    List<AuditLog> getAllAuditLogs();
}
