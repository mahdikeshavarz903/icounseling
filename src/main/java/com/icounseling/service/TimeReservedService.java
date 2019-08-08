package com.icounseling.service;

import com.icounseling.service.dto.TimeReservedDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link com.icounseling.domain.TimeReserved}.
 */
public interface TimeReservedService {

    /**
     * Save a timeReserved.
     *
     * @param timeReservedDTO the entity to save.
     * @return the persisted entity.
     */
    TimeReservedDTO save(TimeReservedDTO timeReservedDTO);

    /**
     * Get all the timeReserveds.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<TimeReservedDTO> findAll(Pageable pageable);


    /**
     * Get the "id" timeReserved.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TimeReservedDTO> findOne(Long id);

    /**
     * Delete the "id" timeReserved.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
