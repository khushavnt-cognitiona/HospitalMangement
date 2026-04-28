package com.hms.repository;

import com.hms.entity.OtpEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface OtpRepository extends JpaRepository<OtpEntity, Long> {

    /**
     * Delete all existing OTPs for a target (email/phone) before generating a new one.
     */
    @Modifying
    @Query("DELETE FROM OtpEntity o WHERE o.target = :target")
    void deleteByTarget(@Param("target") String target);

    /**
     * Find a valid (unused) OTP record by target and OTP code.
     */
    Optional<OtpEntity> findByTargetAndOtpAndIsUsedFalse(String target, String otp);
}
