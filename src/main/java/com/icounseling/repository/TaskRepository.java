package com.icounseling.repository;

import com.icounseling.domain.Planning;
import com.icounseling.domain.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Task entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    Page<Task> findAllByPlanning(Planning planning, Pageable pageable);
}
