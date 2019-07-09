package com.icounseling.service;

import com.icounseling.service.dto.PlanningDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link com.icounseling.domain.Planning}.
 */
public interface PlanningService {

    /**
     * Save a planning.
     *
     * @param planningDTO the entity to save.
     * @return the persisted entity.
     */
    PlanningDTO save(PlanningDTO planningDTO);

    /**
     * Get all the plannings.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<PlanningDTO> findAll(Pageable pageable);


    /**
     * Get the "id" planning.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<PlanningDTO> findOne(Long id);

    /**
     * Delete the "id" planning.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
