package com.icounseling.repository;

import com.icounseling.domain.CounselingCase;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CounselingCase entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CounselingCaseRepository extends JpaRepository<CounselingCase, Long> {

    @Query(value = "SELECT c FROM CounselingCase c where c.counselor.id = :id")
    Page<CounselingCase> findVisitorByCounselorId(@Param("id") Long id, Pageable pageable);
}
