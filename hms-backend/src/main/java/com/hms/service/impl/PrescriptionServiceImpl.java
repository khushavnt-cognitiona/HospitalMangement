package com.hms.service.impl;

import com.hms.entity.Appointment;
import com.hms.entity.Prescription;
import com.hms.repository.AppointmentRepository;
import com.hms.repository.PrescriptionRepository;
import com.hms.service.PrescriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PrescriptionServiceImpl implements PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;
    private final AppointmentRepository appointmentRepository;

    @Override
    public Prescription createPrescription(Long appointmentId, String medicines, String diagnosis, String notes) {
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow();
        
        Prescription prescription = Prescription.builder()
                .appointment(appointment)
                .medicine(medicines)
                // Assuming diagnosis/notes go into specific fields in entity, if they exist
                // If not, we might need to update the entity.
                .date(new Date())
                .build();
        
        return prescriptionRepository.save(prescription);
    }

    @Override
    public Optional<Prescription> getPrescriptionByAppointment(Long appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow();
        return prescriptionRepository.findByAppointment(appointment);
    }
}
