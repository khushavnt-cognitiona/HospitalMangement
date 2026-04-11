package com.hms.service;

import com.hms.entity.User;
import com.hms.dto.ProfileDTO;
import java.util.Optional;

public interface UserService {
    Optional<User> findUserByUsername(String username);
    ProfileDTO getUserProfile();
    ProfileDTO updateProfile(ProfileDTO profileDTO);
}
