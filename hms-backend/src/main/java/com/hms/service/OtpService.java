package com.hms.service;

public interface OtpService {
    String generateOtp(String target);
    boolean verifyOtp(String target, String otp);
}
