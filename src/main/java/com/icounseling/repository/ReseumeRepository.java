package com.icounseling.repository;

import com.icounseling.domain.Reseume;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Reseume entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReseumeRepository extends JpaRepository<Reseume, Long> {

}
