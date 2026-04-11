package com.hms.config;

import com.hms.entity.*;
import com.hms.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

@Configuration
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final WardRepository wardRepository;
    private final BedRepository bedRepository;
    private final DoctorRepository doctorRepository;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            // Seed ADMIN
            User admin = User.builder()
                    .username("admin")
                    .email("admin@hms.com")
                    .password(passwordEncoder.encode("admin123"))
                    .name("Super Admin")
                    .role(Role.ADMIN)
                    .build();
            userRepository.save(admin);
        }

        // Always ensure default doctor exists
        if (userRepository.findByUsername("doctor").isEmpty()) {
            User doctorUser = User.builder()
                    .username("doctor")
                    .email("doctor@hms.com")
                    .password(passwordEncoder.encode("doctor123"))
                    .name("Dr. Smith")
                    .role(Role.DOCTOR)
                    .build();
            User savedDoctorUser = userRepository.save(doctorUser);

            // Seed DOCTOR Profile
            Doctor doctorProfile = Doctor.builder()
                    .user(savedDoctorUser)
                    .specialization("Cardiology")
                    .qualification("MD, PhD")
                    .experienceYears(15)
                    .consultationFee(1200.0)
                    .availabilitySlots("09:00,10:00,11:00,12:00,14:00,15:00,16:00,17:00")
                    .available(true)
                    .profile("Senior cardiologist with 15+ years of clinical excellence.")
                    .build();
            doctorRepository.save(doctorProfile);
        }

        // Ensure all doctors have slots
        doctorRepository.findAll().forEach(doctor -> {
            if (doctor.getAvailabilitySlots() == null || doctor.getAvailabilitySlots().trim().isEmpty()) {
                System.err.println("Seeding default slots for doctor: " + (doctor.getUser() != null ? doctor.getUser().getName() : doctor.getId()));
                doctor.setAvailabilitySlots("09:00,10:00,11:00,12:00,14:00,15:00,16:00,17:00");
                doctorRepository.save(doctor);
            }
        });

        if (wardRepository.count() == 0) {
            Ward generalWard = Ward.builder()
                    .name("General Ward A")
                    .type("GENERAL")
                    .capacity(10)
                    .build();
            wardRepository.save(generalWard);

            // Seed Beds for general ward
            for (int i = 1; i <= 5; i++) {
                Bed bed = Bed.builder()
                        .bedNumber("B" + i)
                        .occupied(false)
                        .ward(generalWard)
                        .build();
                bedRepository.save(bed);
            }
        }
    }
}
