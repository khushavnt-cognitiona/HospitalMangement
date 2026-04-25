package com.hms.service.impl;

import com.hms.entity.OtpEntity;
import com.hms.repository.OtpRepository;
import com.hms.service.EmailService;
import com.hms.service.OtpService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class OtpServiceImpl implements OtpService {

    private final OtpRepository otpRepository;
    private final EmailService emailService;

    @Override
    @Transactional
    public String generateOtp(String target) {
        // Clear any previous OTPs for this target
        otpRepository.deleteByTarget(target);

        // Generate 6-digit OTP
        String otp = String.format("%06d", new Random().nextInt(1000000));

        OtpEntity otpEntity = OtpEntity.builder()
                .target(target)
                .otp(otp)
                .expiryTime(LocalDateTime.now().plusMinutes(5))
                .isUsed(false)
                .build();

        otpRepository.save(otpEntity);
        
        // FORCE LOG OTP FOR CLOUD DEBUGGING
        System.out.println("========================================");
        System.out.println("OTP GENERATED FOR: " + target);
        System.out.println("CODE: " + otp);
        System.out.println("========================================");

        // Send via email (Mock phone for now)
        try {
            if (target != null && target.contains("@")) {
                emailService.sendOtpEmail(target, otp);
            } else {
                System.out.println("DEBUG: SMS path selected but not implemented for " + target);
            }
        } catch (Exception e) {
            System.err.println("ALERT: Non-fatal OTP delivery error: " + e.getMessage());
        }

        return otp;
    }

    @Override
    @Transactional
    public boolean verifyOtp(String target, String otp) {
        return otpRepository.findByTargetAndOtpAndIsUsedFalse(target, otp)
                .map(otpEntity -> {
                    if (otpEntity.getExpiryTime().isAfter(LocalDateTime.now())) {
                        otpEntity.setUsed(true);
                        otpRepository.save(otpEntity);
                        return true;
                    }
                    return false;
                }).orElse(false);
    }
}
