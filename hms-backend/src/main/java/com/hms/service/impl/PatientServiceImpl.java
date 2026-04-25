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
        User user = patient.getUser();
        
        // Update Patient specific clinical fields
        patient.setAge(patientDetails.getAge());
        patient.setGender(patientDetails.getGender());
        patient.setContact(patientDetails.getContact());
        patient.setMedicalHistory(patientDetails.getMedicalHistory());
        
        // Update associated User profile fields if provided in 'profile' or other fields
        // Note: The frontend sends a fat object, so we map the clinical demographics here
        if (user != null) {
            user.setName(patientDetails.getUser().getName());
            user.setEmail(patientDetails.getUser().getEmail());
            user.setPhone(patientDetails.getContact()); // Sync contact with phone
            user.setAddress(patientDetails.getUser().getAddress());
            user.setWeight(patientDetails.getUser().getWeight());
            user.setHeight(patientDetails.getUser().getHeight());
            user.setBio(patientDetails.getUser().getBio());
            user.setBloodGroup(patientDetails.getUser().getBloodGroup());
            user.setDateOfBirth(patientDetails.getUser().getDateOfBirth());
            user.setProfileImage(patientDetails.getUser().getProfileImage());
        }
        
        return repository.save(patient);
    }
}
