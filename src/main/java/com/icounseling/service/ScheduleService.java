package com.icounseling.service;

import com.icounseling.service.dto.ScheduleDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.icounseling.domain.Schedule}.
 */
public interface ScheduleService {

    /**
     * Save a schedule.
     *
     * @param scheduleDTO the entity to save.
     * @return the persisted entity.
     */
    ScheduleDTO save(ScheduleDTO scheduleDTO);

    /**
     * Get all the schedules.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ScheduleDTO> findAll(Pageable pageable);
    /**
     * Get all the ScheduleDTO where Task is {@code null}.
     *
     * @return the list of entities.
     */
    List<ScheduleDTO> findAllWhereTaskIsNull();
    /**
     * Get all the ScheduleDTO where Post is {@code null}.
     *
     * @return the list of entities.
     */
    List<ScheduleDTO> findAllWherePostIsNull();
    /**
     * Get all the ScheduleDTO where Comment is {@code null}.
     *
     * @return the list of entities.
     */
    List<ScheduleDTO> findAllWhereCommentIsNull();


    /**
     * Get the "id" schedule.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ScheduleDTO> findOne(Long id);

    /**
     * Delete the "id" schedule.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
