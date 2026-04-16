package com.hms.repository;

import com.hms.entity.Bed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BedRepository extends JpaRepository<Bed, Long> {
    List<Bed> findByWard(com.hms.entity.Ward ward);
    List<Bed> findByWardId(Long wardId);
    List<Bed> findByOccupied(boolean occupied);
}
