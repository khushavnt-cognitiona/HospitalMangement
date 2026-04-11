package com.hms.controller;

import com.hms.dto.ProfileDTO;
import com.hms.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    @GetMapping("/profile")
    public ResponseEntity<ProfileDTO> getProfile() {
        return ResponseEntity.ok(service.getUserProfile());
    }

    @PutMapping("/profile")
    public ResponseEntity<ProfileDTO> updateProfile(@RequestBody ProfileDTO profileDTO) {
        return ResponseEntity.ok(service.updateProfile(profileDTO));
    }
}
