package com.icounseling.repository;

import com.icounseling.domain.Visitor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Spring Data  repository for the Visitor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VisitorRepository extends JpaRepository<Visitor, Long> {
    //    @Query(value = "SELECT v,u FROM Visitor v inner join v.user u on v.user.id = u.id where v.id = :id")
    @Query(value = "SELECT v FROM Visitor v where v.id = :id")
    Optional<Object> findUserByVisitorId(@Param("id") Long id);
}
