package com.hms.service.impl;

import com.hms.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Override
    public void sendOtpEmail(String to, String otp) {
        // OTP value is NEVER logged here for security
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Your Verification Code – HMSPro");
        message.setText(
            "Hello,\n\n" +
            "Your OTP is: " + otp + "\n\n" +
            "It is valid for 5 minutes. Do not share this code with anyone.\n\n" +
            "If you did not request this, please ignore this email.\n\n" +
            "– HMSPro Security Team"
        );

        try {
            mailSender.send(message);
            System.out.println("INFO: OTP email dispatched successfully to " + to);
        } catch (Exception e) {
            // Do NOT crash the API — caller handles the fallback
            System.err.println("ERROR: Could not send OTP email to " + to + " | " + e.getMessage());
            throw e; // re-throw so OtpServiceImpl can log & swallow it cleanly
        }
    }
}
