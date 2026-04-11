package com.hms.repository;

import com.hms.entity.Billing;
import com.hms.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BillingRepository extends JpaRepository<Billing, Long> {
    List<Billing> findByPatient(Patient patient);
    List<Billing> findByPatientId(Long patientId);
    List<Billing> findByBillingStatus(String billingStatus);
}
