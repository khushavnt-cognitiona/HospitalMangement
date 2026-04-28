package com.hms.service;

public interface OtpService {
    /**
     * Generates a secure OTP, saves it to DB, and sends it via email.
     * Does NOT return the OTP value — it is backend-only.
     */
    void generateOtp(String target);

    /**
     * Verifies the OTP entered by the user.
     * Returns true if valid and not expired; false otherwise.
     */
    boolean verifyOtp(String target, String otp);
}
