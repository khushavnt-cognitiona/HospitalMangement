package com.hms.service;

import com.hms.entity.Prescription;
import java.util.Optional;

public interface PrescriptionService {
    Prescription createPrescription(Long appointmentId, String medicines, String diagnosis, String notes);
    Optional<Prescription> getPrescriptionByAppointment(Long appointmentId);
}
