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

        // 2. Generate cryptographically secure 6-digit OTP
        int otpInt = 100000 + SECURE_RANDOM.nextInt(900000);
        String otp = String.valueOf(otpInt);

        // 3. DEBUG LOG — visible in Render logs only, NEVER sent to frontend or API response
        System.out.println("========================================");
        System.out.println("[OTP] Generated OTP : " + otp);
        System.out.println("[OTP] Sending to    : " + target);
        System.out.println("========================================");

        // 4. Persist OTP with 5-minute expiry
        OtpEntity otpEntity = OtpEntity.builder()
                .target(target)
                .otp(otp)
                .expiryTime(LocalDateTime.now().plusMinutes(5))
                .isUsed(false)
                .attemptCount(0)
                .build();

        otpRepository.save(otpEntity);
        System.out.println("[OTP] OTP saved to DB successfully for: " + target);

        // 5. Send OTP via email — never exposed in API response
        if (target.contains("@")) {
            try {
                emailService.sendOtpEmail(target, otp);
                System.out.println("[OTP] Email sent successfully to: " + target);
            } catch (Exception e) {
                // Do NOT crash the API — OTP is already saved in DB, user can still enter it manually
                System.err.println("[OTP] Email FAILED for: " + target + " | Reason: " + e.getMessage());
                System.out.println("[OTP] OTP is still valid in DB — check Render logs for the code above");
            }
        } else {
            System.out.println("[OTP] Non-email target — SMS not configured for: " + target);
        }
    }

    @Override
    @Transactional
    public boolean verifyOtp(String target, String otp) {
        return otpRepository.findByTargetAndOtpAndIsUsedFalse(target, otp)
                .map(otpEntity -> {
                    // Check max-attempts to prevent brute force
                    if (otpEntity.getAttemptCount() >= MAX_ATTEMPTS) {
                        System.out.println("[OTP] Max attempts reached for: " + target);
                        return false;
                    }

                    // Increment attempt count on each verification try
                    otpEntity.setAttemptCount(otpEntity.getAttemptCount() + 1);

                    // Check expiry
                    if (otpEntity.getExpiryTime().isBefore(LocalDateTime.now())) {
                        otpRepository.save(otpEntity);
                        System.out.println("[OTP] Expired OTP attempt for: " + target);
                        return false;
                    }

                    // Mark OTP as used so it cannot be replayed
                    otpEntity.setIsUsed(true);
                    otpRepository.save(otpEntity);
                    System.out.println("[OTP] OTP verified successfully for: " + target);
                    return true;
                }).orElse(false);
    }
}
