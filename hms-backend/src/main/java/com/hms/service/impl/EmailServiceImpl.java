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
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject("Your HMS OTP Code");
            message.setText("Your OTP code is: " + otp + ". This code is valid for 5 minutes.");
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("CRITICAL: EMAIL DELIVERY FAILED to " + to);
            System.err.println("REASON: " + e.getMessage());
            e.printStackTrace();
            // We DO NOT throw a RuntimeException here to avoid 500 errors.
            // OTP can still be recovered from backend logs if needed for internal testing.
        }
    }
}
