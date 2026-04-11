package com.hms.service;

import com.hms.entity.Staff;
import java.util.List;

public interface StaffService {
    List<Staff> getAllStaff();
    Staff createStaff(Staff staff);
    Staff updateStaff(Long id, Staff staffDetails);
    void deleteStaff(Long id);
}
