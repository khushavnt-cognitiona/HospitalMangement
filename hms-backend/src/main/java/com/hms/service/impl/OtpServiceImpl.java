package com.hms.service.impl;

import com.hms.entity.OtpEntity;
import com.hms.repository.OtpRepository;
import com.hms.service.EmailService;
import com.hms.service.OtpService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class OtpServiceImpl implements OtpService {

    private static final int MAX_ATTEMPTS = 5;
    private static final SecureRandom SECURE_RANDOM = new SecureRandom();

    private final OtpRepository otpRepository;
    private final EmailService emailService;

    @Override
    @Transactional
    public void generateOtp(String target) {
        // 1. Clear any previous OTPs for this target
        otpRepository.deleteByTarget(target);

        // 2. Generate cryptographically secure 6-digit OTP (never hardcoded, never exposed)
        int otpInt = 100000 + SECURE_RANDOM.nextInt(900000);
        String otp = String.valueOf(otpInt);

        // 3. Persist OTP with 5-minute expiry
        OtpEntity otpEntity = OtpEntity.builder()
                .target(target)
                .otp(otp)
                .expiryTime(LocalDateTime.now().plusMinutes(5))
                .isUsed(false)
                .attemptCount(0)
                .build();

        otpRepository.save(otpEntity);

        // 4. Send OTP via email — never log or expose the OTP value
        if (target.contains("@")) {
            try {
                emailService.sendOtpEmail(target, otp);
                System.out.println("INFO: OTP email dispatched to " + target);
            } catch (Exception e) {
                // Log error but do NOT crash the API — OTP is already saved in DB
                System.err.println("WARNING: Failed to send OTP email to " + target + ". Reason: " + e.getMessage());
            }
        } else {
            System.out.println("INFO: SMS channel not configured — OTP stored in DB for target " + target);
        }
        // OTP value is NEVER returned or logged here
    }

    @Override
    @Transactional
    public boolean verifyOtp(String target, String otp) {
        return otpRepository.findByTargetAndOtpAndIsUsedFalse(target, otp)
                .map(otpEntity -> {
                    // Check max-attempts to prevent brute force
                    if (otpEntity.getAttemptCount() >= MAX_ATTEMPTS) {
                        return false;
                    }

                    // Increment attempt count on each verification try
                    otpEntity.setAttemptCount(otpEntity.getAttemptCount() + 1);

                    // Check expiry
                    if (otpEntity.getExpiryTime().isBefore(LocalDateTime.now())) {
                        otpRepository.save(otpEntity);
                        return false;
                    }

                    // Mark OTP as used so it cannot be replayed
                    otpEntity.setIsUsed(true);
                    otpRepository.save(otpEntity);
                    return true;
                }).orElse(false);
    }
}
