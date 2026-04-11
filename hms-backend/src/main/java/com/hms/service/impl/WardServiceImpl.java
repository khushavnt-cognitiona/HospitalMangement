package com.hms.service.impl;

import com.hms.entity.Bed;
import com.hms.entity.Patient;
import com.hms.entity.Ward;
import com.hms.repository.BedRepository;
import com.hms.repository.PatientRepository;
import com.hms.repository.WardRepository;
import com.hms.service.WardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WardServiceImpl implements WardService {

    private final WardRepository wardRepository;
    private final BedRepository bedRepository;
    private final PatientRepository patientRepository;

    @Override
    public List<Ward> getAllWards() {
        return wardRepository.findAll();
    }

    @Override
    public Ward createWard(Ward ward) {
        return wardRepository.save(ward);
    }

    @Override
    public Ward updateWard(Long id, Ward wardDetails) {
        Ward ward = wardRepository.findById(id).orElseThrow();
        ward.setName(wardDetails.getName());
        ward.setType(wardDetails.getType());
        ward.setCapacity(wardDetails.getCapacity());
        return wardRepository.save(ward);
    }

    @Override
    public void deleteWard(Long id) {
        wardRepository.deleteById(id);
    }

    @Override
    public List<Bed> getBedsByWard(Long wardId) {
        Ward ward = wardRepository.findById(wardId).orElseThrow();
        return bedRepository.findByWard(ward);
    }

    @Override
    public Bed updateBedStatus(Long bedId, boolean occupied) {
        Bed bed = bedRepository.findById(bedId).orElseThrow();
        bed.setOccupied(occupied);
        return bedRepository.save(bed);
    }

    @Override
    public Bed allocateBed(Long bedId, Long patientId) {
        Bed bed = bedRepository.findById(bedId).orElseThrow();
        Patient patient = patientRepository.findById(patientId).orElseThrow();
        
        bed.setOccupied(true);
        // Relationship logic if Bed has a Patient field, but for now we just mark occupied
        return bedRepository.save(bed);
    }
}
