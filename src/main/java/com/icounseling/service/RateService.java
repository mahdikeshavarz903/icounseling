package com.icounseling.service;

import com.icounseling.service.dto.RateDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.icounseling.domain.Rate}.
 */
public interface RateService {

    /**
     * Save a rate.
     *
     * @param rateDTO the entity to save.
     * @return the persisted entity.
     */
    RateDTO save(RateDTO rateDTO);

    /**
     * Get all the rates.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<RateDTO> findAll(Pageable pageable);
    /**
     * Get all the RateDTO where Document is {@code null}.
     *
     * @return the list of entities.
     */
    List<RateDTO> findAllWhereDocumentIsNull();
    /**
     * Get all the RateDTO where Comment is {@code null}.
     *
     * @return the list of entities.
     */
    List<RateDTO> findAllWhereCommentIsNull();


    /**
     * Get the "id" rate.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<RateDTO> findOne(Long id);

    /**
     * Delete the "id" rate.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
