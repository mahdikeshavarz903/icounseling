package com.icounseling.service;

import com.icounseling.service.dto.*;
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


    /**
     * Get all cases for one counselors.
     *
     * @param pageable the pagination information.
     * @param id       the counselor id
     * @return the list of entities.
     */
    Page<CounselingCaseDTO> findAllCasesForOneCounselor(Long id, Pageable pageable);

    /**
     * Get the "id" counselor.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CounselorDTO> findOne(Long id);


    /**
     * Get all visitor information.
     *
     * @param id the visitor id
     * @return the entity.
     */
    Optional<VisitorDTO> findAllVisitorInformation(Long id);

    /**
     * Get all reserved times for counselor.
     *
     * @param pageable the pagination information.
     * @param id       the counselor id
     * @return the list of entities.
     */
    Page<TimeReservedDTO> findAllReservedTime(Long id, Pageable pageable);


    /**
     * Get all reserved times for counselor.
     *
     * @param pageable the pagination information.
     * @param id       the counselor id
     * @return the list of entities.
     */
    Page<TaskDTO> findAllCounselorPlans(Long id, Pageable pageable);

//    Planning createNewCounselorPlan(Long id);

    /**
     * Delete the "id" counselor.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
