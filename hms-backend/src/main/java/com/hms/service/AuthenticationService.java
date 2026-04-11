package com.hms.service;

import com.hms.dto.AuthenticationRequest;
import com.hms.dto.AuthenticationResponse;
import com.hms.dto.RegisterRequest;

public interface AuthenticationService {
    AuthenticationResponse register(RegisterRequest request);
    AuthenticationResponse authenticate(AuthenticationRequest request);
}
