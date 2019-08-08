package com.icounseling.repository;

import com.icounseling.domain.Visitor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Visitor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VisitorRepository extends JpaRepository<Visitor, Long> {

}
