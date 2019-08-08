package com.icounseling.repository;

import com.icounseling.domain.CounselingCase;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CounselingCase entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CounselingCaseRepository extends JpaRepository<CounselingCase, Long> {

    //    @Query(value = "SELECT c,v FROM CounselingCase c inner join c.visitor v on c.counselor = v.id")
    Page<CounselingCase> findCounselingCaseByCounselorId(Long id, Pageable pageable);
}
