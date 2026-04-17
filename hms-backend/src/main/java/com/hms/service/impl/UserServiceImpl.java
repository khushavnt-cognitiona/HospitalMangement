package com.hms.service.impl;

import com.hms.entity.*;
import com.hms.dto.ProfileDTO;
import com.hms.repository.UserRepository;
import com.hms.repository.PatientRepository;
import com.hms.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PatientRepository patientRepository;

    @Override
    public Optional<User> findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public ProfileDTO getUserProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElseThrow();
        
        ProfileDTO.ProfileDTOBuilder builder = ProfileDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .name(user.getName())
                .role(user.getRole())
                .phone(user.getPhone())
                .address(user.getAddress())
                .bloodGroup(user.getBloodGroup())
                .profileImage(user.getProfileImage())
                .dateOfBirth(user.getDateOfBirth())
                .emergencyContact(user.getEmergencyContact())
                .knownAllergies(user.getKnownAllergies());

        if (user.getRole() == Role.PATIENT) {
            patientRepository.findByUser(user).ifPresent(p -> {
                builder.age(p.getAge())
                       .gender(p.getGender())
                       .medicalHistory(p.getMedicalHistory());
            });
        }
        
        return builder.build();
    }

    @Override
    @Transactional
    public ProfileDTO updateProfile(ProfileDTO dto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElseThrow();
        
        // Update User info - ONLY update if value is provided from frontend
        if (dto.getName() != null) user.setName(dto.getName());
        if (dto.getPhone() != null) user.setPhone(dto.getPhone());
        if (dto.getAddress() != null) user.setAddress(dto.getAddress());
        if (dto.getBloodGroup() != null) user.setBloodGroup(dto.getBloodGroup());
        if (dto.getProfileImage() != null) user.setProfileImage(dto.getProfileImage());
        if (dto.getDateOfBirth() != null) user.setDateOfBirth(dto.getDateOfBirth());
        if (dto.getEmergencyContact() != null) user.setEmergencyContact(dto.getEmergencyContact());
        if (dto.getKnownAllergies() != null) user.setKnownAllergies(dto.getKnownAllergies());
        
        userRepository.save(user);

        // Update Patient specific info if applicable
        if (user.getRole() == Role.PATIENT) {
            Patient patient = patientRepository.findByUser(user).orElseGet(() -> {
                Patient p = new Patient();
                p.setUser(user);
                return p;
            });
            
            if (dto.getAge() != null) patient.setAge(dto.getAge());
            if (dto.getGender() != null) patient.setGender(dto.getGender());
            if (dto.getMedicalHistory() != null) patient.setMedicalHistory(dto.getMedicalHistory());
            
            patientRepository.save(patient);
        }
        
        return getUserProfile();
    }
}
