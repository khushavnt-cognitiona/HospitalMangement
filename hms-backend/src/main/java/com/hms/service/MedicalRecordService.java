package com.hms.service;

import com.hms.entity.MedicalRecord;
import com.hms.entity.Patient;
import java.util.List;
import java.util.Optional;

public interface MedicalRecordService {
    MedicalRecord createRecord(MedicalRecord record);
    List<MedicalRecord> getRecordsByPatient(Long patientId);
    Optional<MedicalRecord> getRecordById(Long id);
    void deleteRecord(Long id);
}
