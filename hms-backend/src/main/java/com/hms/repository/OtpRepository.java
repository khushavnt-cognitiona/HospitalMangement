package com.hms.repository;

import com.hms.entity.OtpEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OtpRepository extends JpaRepository<OtpEntity, Long> {
    List<OtpEntity> findAllByTargetAndIsUsedFalseOrderByExpiryTimeDesc(String target);
}
