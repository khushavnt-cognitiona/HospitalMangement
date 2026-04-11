package com.hms.service.impl;

import com.hms.entity.Staff;
import com.hms.repository.StaffRepository;
import com.hms.service.StaffService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StaffServiceImpl implements StaffService {

    private final StaffRepository repository;

    @Override
    public List<Staff> getAllStaff() {
        return repository.findAll();
    }

    @Override
    public Staff createStaff(Staff staff) {
        return repository.save(staff);
    }

    @Override
    public Staff updateStaff(Long id, Staff staffDetails) {
        Staff staff = repository.findById(id).orElseThrow();
        staff.setDepartment(staffDetails.getDepartment());
        staff.setDesignation(staffDetails.getDesignation());
        staff.setQualification(staffDetails.getQualification());
        staff.setContact(staffDetails.getContact());
        return repository.save(staff);
    }

    @Override
    public void deleteStaff(Long id) {
        repository.deleteById(id);
    }
}
