package com.icounseling.repository;

import com.icounseling.domain.CounselingCase;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CounselingCase entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CounselingCaseRepository extends JpaRepository<CounselingCase, Long> {

}
