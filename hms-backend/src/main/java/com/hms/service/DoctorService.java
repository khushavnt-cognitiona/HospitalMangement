package com.hms.service;

import com.hms.entity.Doctor;
import com.hms.entity.User;
import java.util.List;
import java.util.Optional;

public interface DoctorService {
    List<Doctor> getAllDoctors();
    Optional<Doctor> getDoctorById(Long id);
    Doctor updateDoctor(Long id, Doctor doctorDetails);
    Optional<Doctor> getDoctorByUser(User user);
}
