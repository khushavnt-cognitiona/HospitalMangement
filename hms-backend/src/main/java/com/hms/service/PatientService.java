package com.hms.service;

import com.hms.entity.Patient;
import com.hms.entity.User;
import java.util.Optional;

public interface PatientService {
    Optional<Patient> getPatientById(Long id);
    Optional<Patient> getPatientByUser(User user);
    Optional<Patient> getPatientByUserId(Long userId);
    Patient updatePatient(Long id, Patient patientDetails);
}
