package com.hms.service.impl;

import com.hms.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Override
    public void sendOtpEmail(String to, String otp) {
        System.out.println("========================================");
        System.out.println("[EMAIL] Attempting to send OTP email");
        System.out.println("[EMAIL] From    : " + fromEmail);
        System.out.println("[EMAIL] To      : " + to);
        System.out.println("[EMAIL] OTP len : " + (otp != null ? otp.length() : "null") + " digits");
        System.out.println("========================================");

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
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
            System.out.println("[EMAIL] SUCCESS - OTP email sent to: " + to);
        } catch (Exception e) {
            System.err.println("[EMAIL] FAILED - Could not send to: " + to);
            System.err.println("[EMAIL] Error type   : " + e.getClass().getSimpleName());
            System.err.println("[EMAIL] Error message: " + e.getMessage());
            if (e.getCause() != null) {
                System.err.println("[EMAIL] Root cause  : " + e.getCause().getMessage());
            }
            e.printStackTrace();
            // Re-throw so OtpServiceImpl logs it but does NOT crash the API
            throw new RuntimeException("Email delivery failed: " + e.getMessage(), e);
        }
    }
}
