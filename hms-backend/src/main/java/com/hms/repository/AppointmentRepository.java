package com.hms.repository;

import com.hms.entity.Appointment;
import com.hms.entity.Doctor;
import com.hms.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.time.LocalDateTime;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByDoctor(Doctor doctor);
    List<Appointment> findByPatient(Patient patient);
    List<Appointment> findByDoctorAndSlotTimeBetween(Doctor doctor, LocalDateTime start, LocalDateTime end);
}

