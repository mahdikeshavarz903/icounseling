package com.icounseling.service;

import com.icounseling.domain.Counselor;
import com.icounseling.service.dto.*;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
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


    /**
     * Create new counselor plan
     * @param planningDTO counselor plan
     * @return Planning entity.
     */
    PlanningDTO createNewCounselorPlan(PlanningDTO planningDTO);

    /**
     * Create new counselor plan
     * @param planningDTO counselor plan
     * @return Planning entity.
     */
    PlanningDTO updateCounselorPlan(PlanningDTO planningDTO);

    /**
     * Delete the counselor plan.
     *
     * @param planId the plan id.
     */
    void deleteCounselorPlan(Long planId);

    /**
     * Delete the "id" counselor.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);


    /**
     * Get counselor posts
     *
     * @param pageable the pagination information.
     * @param id the id of the entity.
     *
     * @return the list of entities.
     */
    Page<PostDTO> findCounselorPosts(Pageable pageable,Long id);

    /**
     * Create a new post
     *
     * @param postDTO the counselor post
     *
     * @return Post entity.
     */
    PostDTO createCounselorPost(PostDTO postDTO);

    /**
     * Update the counselor post
     *
     * @param postDTO the counselor post
     *
     * @return Post entity.
     */
    PostDTO updateCounselorPost(PostDTO postDTO);

    /**
     * Delete the counselor post
     *
     * @param postId the counselor post id
     *
     */
    void deleteCounselorPost(Long postId);

    /**
     * Get counselor information
     *
     * @param id the id of the entity.
     *
     * @return the list of entities.
     */
    Optional<CustomCounselorDTO> reviewCounselorInformation(Long id);
}
