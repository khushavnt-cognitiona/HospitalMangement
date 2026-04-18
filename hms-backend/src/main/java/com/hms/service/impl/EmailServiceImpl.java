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
            System.err.println("FAILED TO SEND EMAIL to " + to + ": " + e.getMessage());
            // We throw a RuntimeException so the service layer knows it failed, 
            // but we've logged the detail for debugging.
            throw new RuntimeException("Email delivery failed. Please check SMTP configuration.");
        }
    }
}
