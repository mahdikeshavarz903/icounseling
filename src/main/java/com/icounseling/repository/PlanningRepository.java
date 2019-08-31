package com.icounseling.repository;

import com.icounseling.domain.Planning;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Planning entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlanningRepository extends JpaRepository<Planning, Long> {
    //    @Query(value = "SELECT p,c FROM Planning p inner join p.counselor c on p.counselor = c.id",
//    nativeQuery = true)
    Planning findAllByCounselorId(Long id);
}
