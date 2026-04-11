package com.hms.service.impl;

import com.hms.entity.Patient;
import com.hms.entity.User;
import com.hms.repository.PatientRepository;
import com.hms.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PatientServiceImpl implements PatientService {

    private final PatientRepository repository;

    @Override
    public Optional<Patient> getPatientById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Optional<Patient> getPatientByUser(User user) {
        return repository.findByUser(user);
    }

    @Override
    public Optional<Patient> getPatientByUserId(Long userId) {
        return repository.findByUser_Id(userId);
    }

    @Override
    public Patient updatePatient(Long id, Patient patientDetails) {
        Patient patient = repository.findById(id).orElseThrow();
        patient.setAge(patientDetails.getAge());
        patient.setGender(patientDetails.getGender());
        patient.setContact(patientDetails.getContact());
        patient.setMedicalHistory(patientDetails.getMedicalHistory());
        patient.setProfile(patientDetails.getProfile());
        return repository.save(patient);
    }
}
