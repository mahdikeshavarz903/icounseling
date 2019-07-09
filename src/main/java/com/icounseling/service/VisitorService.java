package com.icounseling.service;

import com.icounseling.service.dto.VisitorDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.icounseling.domain.Visitor}.
 */
public interface VisitorService {

    /**
     * Save a visitor.
     *
     * @param visitorDTO the entity to save.
     * @return the persisted entity.
     */
    VisitorDTO save(VisitorDTO visitorDTO);

    /**
     * Get all the visitors.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<VisitorDTO> findAll(Pageable pageable);
    /**
     * Get all the VisitorDTO where CounselingCase is {@code null}.
     *
     * @return the list of entities.
     */
    List<VisitorDTO> findAllWhereCounselingCaseIsNull();
    /**
     * Get all the VisitorDTO where Library is {@code null}.
     *
     * @return the list of entities.
     */
    List<VisitorDTO> findAllWhereLibraryIsNull();


    /**
     * Get the "id" visitor.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<VisitorDTO> findOne(Long id);

    /**
     * Delete the "id" visitor.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
