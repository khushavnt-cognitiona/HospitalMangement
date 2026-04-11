package com.hms.service.impl;

import com.hms.entity.MedicalRecord;
import com.hms.repository.MedicalRecordRepository;
import com.hms.service.MedicalRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MedicalRecordServiceImpl implements MedicalRecordService {

    private final MedicalRecordRepository repository;

    @Override
    public MedicalRecord createRecord(MedicalRecord record) {
        return repository.save(record);
    }

    @Override
    public List<MedicalRecord> getRecordsByPatient(Long patientId) {
        return repository.findByPatientId(patientId);
    }

    @Override
    public Optional<MedicalRecord> getRecordById(Long id) {
        return repository.findById(id);
    }

    @Override
    public void deleteRecord(Long id) {
        repository.deleteById(id);
    }
}
