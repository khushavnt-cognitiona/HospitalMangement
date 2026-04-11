package com.hms.repository;

import com.hms.entity.Nurse;
import com.hms.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface NurseRepository extends JpaRepository<Nurse, Long> {
    Optional<Nurse> findByUser(User user);
}
