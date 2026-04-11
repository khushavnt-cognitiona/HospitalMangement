package com.hms.service;

import com.hms.entity.Bed;
import com.hms.entity.Ward;
import java.util.List;

public interface WardService {
    List<Ward> getAllWards();
    Ward createWard(Ward ward);
    Ward updateWard(Long id, Ward wardDetails);
    void deleteWard(Long id);
    
    // Bed management
    List<Bed> getBedsByWard(Long wardId);
    Bed updateBedStatus(Long bedId, boolean occupied);
    Bed allocateBed(Long bedId, Long patientId);
}
