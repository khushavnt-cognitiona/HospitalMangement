package com.hms.service;

import com.hms.dto.AuthenticationRequest;
import com.hms.dto.AuthenticationResponse;
import com.hms.dto.RegisterRequest;
import com.hms.dto.OtpVerificationRequest;

public interface AuthenticationService {
    AuthenticationResponse register(RegisterRequest request);
    AuthenticationResponse authenticate(AuthenticationRequest request);
    void sendOtp(String target);
    AuthenticationResponse verifyOtp(OtpVerificationRequest request);
}
