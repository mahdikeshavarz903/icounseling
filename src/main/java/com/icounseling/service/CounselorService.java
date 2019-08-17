package com.icounseling.service;

import com.icounseling.service.dto.CounselingCaseDTO;
import com.icounseling.service.dto.CounselorDTO;
import com.icounseling.service.dto.VisitorDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link com.icounseling.domain.Counselor}.
 */
public interface CounselorService {

    /**
     * Save a counselor.
     *
     * @param counselorDTO the entity to save.
     * @return the persisted entity.
     */
    CounselorDTO save(CounselorDTO counselorDTO);

    /**
     * Get all the counselors.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<CounselorDTO> findAll(Pageable pageable);


    Page<CounselingCaseDTO> findAllCasesForOneCounselor(Long id, Pageable pageable);

    /**
     * Get the "id" counselor.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CounselorDTO> findOne(Long id);


    Optional<VisitorDTO> findAllVisitorInformation(Long id);
    /**
     * Delete the "id" counselor.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
