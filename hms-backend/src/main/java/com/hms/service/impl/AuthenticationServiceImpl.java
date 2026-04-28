package com.hms.service.impl;

import com.hms.security.JwtService;
import com.hms.dto.AuthenticationRequest;
import com.hms.dto.AuthenticationResponse;
import com.hms.dto.RegisterRequest;
import com.hms.dto.OtpVerificationRequest;
import com.hms.dto.OtpRequest;
import com.hms.entity.*;
import com.hms.repository.*;
import com.hms.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository repository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final NurseRepository nurseRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final com.hms.service.OtpService otpService;

    @Override
    public AuthenticationResponse register(RegisterRequest request) {
        // ... existing registration code (keep it as is)
        var user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .role(request.getRole())
                .build();
        var savedUser = repository.save(user);

        // Create specific profiles based on role
        if (request.getRole() == Role.DOCTOR) {
            doctorRepository.save(Doctor.builder()
                    .user(savedUser)
                    .specialization(request.getSpecialization() != null ? request.getSpecialization() : "General Medicine")
                    .qualification(request.getQualification() != null ? request.getQualification() : "MBBS")
                    .available(request.getAvailable() != null ? request.getAvailable() : true)
                    .consultationFee(request.getConsultationFee() != null ? request.getConsultationFee() : 500.0)
                    .experienceYears(request.getExperienceYears() != null ? request.getExperienceYears() : 5)
                    .availabilitySlots("09:00,10:00,11:00,12:00,14:00,15:00,16:00,17:00")
                    .build());
        } else if (request.getRole() == Role.PATIENT) {
            patientRepository.save(Patient.builder()
                    .user(savedUser)
                    .age(request.getAge() != null ? request.getAge() : 0)
                    .gender(request.getGender() != null ? request.getGender() : "Unknown")
                    .contact(request.getContact() != null ? request.getContact() : "Unknown")
                    .build());
        } else if (request.getRole() == Role.NURSE) {
            nurseRepository.save(Nurse.builder()
                    .user(savedUser)
                    .wardAssigned(request.getWardAssigned() != null ? request.getWardAssigned() : "Not Assigned")
                    .build());
        }

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .id(savedUser.getId())
                .username(user.getUsername())
                .name(user.getName())
                .role(user.getRole())
                .build();
    }

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
            );
        var user = repository.findByUsername(request.getUsername())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .id(user.getId())
                .username(user.getUsername())
                .name(user.getName())
                .role(user.getRole())
                .build();
    }

    @Override
    public void sendOtp(OtpRequest request) {
        if (request == null || request.getTarget() == null || request.getTarget().trim().isEmpty()) {
            throw new RuntimeException("OTP target is missing in request body");
        }
        
        String target = request.getTarget().trim();
        System.out.println("DEBUG: Attempting to send OTP to: " + target);

        // Pre-validation: Ensure user exists
        repository.findByEmail(target)
                .orElseGet(() -> repository.findByPhone(target)
                        .orElseThrow(() -> new RuntimeException("No account found with this email/mobile")));

        try {
            // Trigger OTP generation (includes DB save and email send attempt)
            otpService.generateOtp(target);
            
            System.out.println("DEBUG: OTP generation process triggered for: " + target);
        } catch (Exception e) {
            System.err.println("CRITICAL ERROR IN sendOtp: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to process OTP request. Please try again later.");
        }
    }

    @Override
    public AuthenticationResponse verifyOtp(OtpVerificationRequest request) {
        if (!otpService.verifyOtp(request.getTarget(), request.getOtp())) {
            throw new RuntimeException("Invalid or expired OTP");
        }

        // Find user by email or phone
        var user = repository.findByEmail(request.getTarget())
                .orElseGet(() -> repository.findByPhone(request.getTarget())
                        .orElseThrow(() -> new RuntimeException("User not found")));

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .id(user.getId())
                .username(user.getUsername())
                .name(user.getName())
                .role(user.getRole())
                .build();
    }
}
