package com.icounseling.service;

import com.icounseling.service.dto.ScoreDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.icounseling.domain.Score}.
 */
public interface ScoreService {

    /**
     * Save a score.
     *
     * @param scoreDTO the entity to save.
     * @return the persisted entity.
     */
    ScoreDTO save(ScoreDTO scoreDTO);

    /**
     * Get all the scores.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ScoreDTO> findAll(Pageable pageable);
    /**
     * Get all the ScoreDTO where Counselor is {@code null}.
     *
     * @return the list of entities.
     */
    List<ScoreDTO> findAllWhereCounselorIsNull();
    /**
     * Get all the ScoreDTO where Visitor is {@code null}.
     *
     * @return the list of entities.
     */
    List<ScoreDTO> findAllWhereVisitorIsNull();


    /**
     * Get the "id" score.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ScoreDTO> findOne(Long id);

    /**
     * Delete the "id" score.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
