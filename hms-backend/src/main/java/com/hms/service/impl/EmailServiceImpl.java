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

    public void sendOtpEmail(String to, String otp) {
        System.out.println("OTP: " + otp);
        System.out.println("Sending OTP to: " + to);

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject("Your HMS OTP Code");
            message.setText("Your OTP code is: " + otp + ". This code is valid for 5 minutes.");
            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Email failed but OTP generated");
        }
    }
}
