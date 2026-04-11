package com.hms.repository;

import com.hms.entity.LabResult;
import com.hms.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LabResultRepository extends JpaRepository<LabResult, Long> {
    List<LabResult> findByPatient(Patient patient);
}
