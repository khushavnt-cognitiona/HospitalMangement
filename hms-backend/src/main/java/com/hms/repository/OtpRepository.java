package com.hms.repository;

import com.hms.entity.OtpEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

public interface OtpRepository extends JpaRepository<OtpEntity, Long> {
    Optional<OtpEntity> findByTargetAndOtpAndIsUsedFalse(String target, String otp);
    
    @Modifying
    @Transactional
    void deleteByTarget(String target);
}
