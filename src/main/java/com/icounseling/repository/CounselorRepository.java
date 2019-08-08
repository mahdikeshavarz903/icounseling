package com.icounseling.repository;

import com.icounseling.domain.Counselor;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Counselor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CounselorRepository extends JpaRepository<Counselor, Long> {

}
