package com.icounseling.repository;

import com.icounseling.domain.TimeReserved;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TimeReserved entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TimeReservedRepository extends JpaRepository<TimeReserved, Long> {
    Page<TimeReserved> findTimeReservedByCounselorId(Long id, Pageable pageable);
}
