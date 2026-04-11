package com.hms.service;

import com.hms.entity.LabResult;
import com.hms.entity.LabTest;
import java.util.List;

public interface LabService {
    List<LabTest> getAllTests();
    LabResult orderTest(Long testId, Long patientId, Long doctorId);
    LabResult updateResult(Long resultId, String value, String normalRange);
    List<LabResult> getPatientResults(Long patientId);
}
