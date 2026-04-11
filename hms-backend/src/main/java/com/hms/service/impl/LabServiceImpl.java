package com.hms.service.impl;

import com.hms.entity.*;
import com.hms.repository.LabResultRepository;
import com.hms.repository.LabTestRepository;
import com.hms.repository.PatientRepository;
import com.hms.repository.DoctorRepository;
import com.hms.service.LabService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LabServiceImpl implements LabService {

    private final LabTestRepository labTestRepository;
    private final LabResultRepository labResultRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    @Override
    public List<LabTest> getAllTests() {
        return labTestRepository.findAll();
    }

    @Override
    public LabResult orderTest(Long testId, Long patientId, Long doctorId) {
        LabTest test = labTestRepository.findById(testId).orElseThrow();
        Patient patient = patientRepository.findById(patientId).orElseThrow();
        Doctor doctor = doctorRepository.findById(doctorId).orElseThrow();

        LabResult result = LabResult.builder()
                .labTest(test)
                .patient(patient)
                .doctor(doctor)
                .status("ORDERED")
                .orderDate(LocalDateTime.now())
                .build();
        
        return labResultRepository.save(result);
    }

    @Override
    public LabResult updateResult(Long resultId, String value, String normalRange) {
        LabResult result = labResultRepository.findById(resultId).orElseThrow();
        result.setResultValue(value);
        result.setNormalRange(normalRange);
        result.setStatus("COMPLETED");
        result.setCompletionDate(LocalDateTime.now());
        
        return labResultRepository.save(result);
    }

    @Override
    public List<LabResult> getPatientResults(Long patientId) {
        Patient patient = patientRepository.findById(patientId).orElseThrow();
        return labResultRepository.findByPatient(patient);
    }
}
