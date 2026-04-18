package com.hms.repository;

import com.hms.entity.OtpEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface OtpRepository extends JpaRepository<OtpEntity, Long> {
    Optional<OtpEntity> findByTargetAndOtpAndIsUsedFalse(String target, String otp);
    void deleteByTarget(String target);
}
