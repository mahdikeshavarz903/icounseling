package com.icounseling.service;

import com.icounseling.service.dto.CounselingCaseDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link com.icounseling.domain.CounselingCase}.
 */
public interface CounselingCaseService {

    /**
     * Save a counselingCase.
     *
     * @param counselingCaseDTO the entity to save.
     * @return the persisted entity.
     */
    CounselingCaseDTO save(CounselingCaseDTO counselingCaseDTO);

    /**
     * Get all the counselingCases.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<CounselingCaseDTO> findAll(Pageable pageable);


    /**
     * Get the "id" counselingCase.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CounselingCaseDTO> findOne(Long id);

    /**
     * Delete the "id" counselingCase.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
