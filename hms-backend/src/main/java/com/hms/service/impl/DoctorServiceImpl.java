package com.hms.service.impl;

import com.hms.entity.Doctor;
import com.hms.entity.User;
import com.hms.repository.DoctorRepository;
import com.hms.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepository repository;

    @Override
    public List<Doctor> getAllDoctors() {
        return repository.findAll();
    }

    @Override
    public Optional<Doctor> getDoctorById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Doctor updateDoctor(Long id, Doctor doctorDetails) {
        Doctor doctor = repository.findById(id).orElseThrow();
        doctor.setSpecialization(doctorDetails.getSpecialization());
        doctor.setQualification(doctorDetails.getQualification());
        doctor.setAvailabilitySlots(doctorDetails.getAvailabilitySlots());
        doctor.setProfile(doctorDetails.getProfile());
        return repository.save(doctor);
    }

    @Override
    public Optional<Doctor> getDoctorByUser(User user) {
        return repository.findByUser(user);
    }
}
