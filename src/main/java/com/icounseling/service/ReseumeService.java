package com.icounseling.service;

import com.icounseling.service.dto.ReseumeDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link com.icounseling.domain.Reseume}.
 */
public interface ReseumeService {

    /**
     * Save a reseume.
     *
     * @param reseumeDTO the entity to save.
     * @return the persisted entity.
     */
    ReseumeDTO save(ReseumeDTO reseumeDTO);

    /**
     * Get all the reseumes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ReseumeDTO> findAll(Pageable pageable);


    /**
     * Get the "id" reseume.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ReseumeDTO> findOne(Long id);

    /**
     * Delete the "id" reseume.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
