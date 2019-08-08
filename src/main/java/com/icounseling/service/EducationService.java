package com.icounseling.service;

import com.icounseling.service.dto.EducationDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.icounseling.domain.Education}.
 */
public interface EducationService {

    /**
     * Save a education.
     *
     * @param educationDTO the entity to save.
     * @return the persisted entity.
     */
    EducationDTO save(EducationDTO educationDTO);

    /**
     * Get all the educations.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<EducationDTO> findAll(Pageable pageable);
    /**
     * Get all the EducationDTO where Counselor is {@code null}.
     *
     * @return the list of entities.
     */
    List<EducationDTO> findAllWhereCounselorIsNull();
    /**
     * Get all the EducationDTO where Visitor is {@code null}.
     *
     * @return the list of entities.
     */
    List<EducationDTO> findAllWhereVisitorIsNull();


    /**
     * Get the "id" education.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<EducationDTO> findOne(Long id);

    /**
     * Delete the "id" education.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
