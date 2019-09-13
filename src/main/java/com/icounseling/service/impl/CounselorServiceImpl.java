package com.icounseling.service.impl;

import com.icounseling.domain.Counselor;
import com.icounseling.domain.Planning;
import com.icounseling.domain.Post;
import com.icounseling.domain.Visitor;
import com.icounseling.repository.*;
import com.icounseling.service.CounselorService;
import com.icounseling.service.TaskService;
import com.icounseling.service.dto.*;
import com.icounseling.service.mapper.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Counselor}.
 */
@Service
@Transactional
public class CounselorServiceImpl implements CounselorService {

    private final Logger log = LoggerFactory.getLogger(CounselorServiceImpl.class);

    private final CounselorRepository counselorRepository;

    private final CounselorMapper counselorMapper;

    private final CounselingCaseRepository counselingCaseRepository;

    private final CounselingCaseMapper counselingCaseMapper;

    private final VisitorRepository visitorRepository;

    private final TimeReservedRepository timeReservedRepository;

    private final TimeReservedMapper timeReservedMapper;

    private final PlanningRepository planningRepository;

    private final PlanningMapper planningMapper;

    private final TaskService taskService;

    private final TaskRepository taskRepository;

    private final TaskMapper taskMapper;

    private final PostRepository postRepository;

    private final PostMapper postMapper;

    private final VisitorMapper visitorMapper;

    public CounselorServiceImpl(CounselorRepository counselorRepository, CounselorMapper counselorMapper, CounselingCaseRepository counselingCaseRepository, CounselingCaseMapper counselingCaseMapper, VisitorRepository visitorRepository, TimeReservedRepository timeReservedRepository, TimeReservedMapper timeReservedMapper, PlanningMapper planningMapper, PlanningRepository planningRepository, PlanningMapper planningMapper1, TaskService taskService, TaskRepository taskRepository, TaskMapper taskMapper, PostRepository postRepository, PostMapper postMapper, VisitorMapper visitorMapper) {
        this.counselorRepository = counselorRepository;
        this.counselorMapper = counselorMapper;
        this.counselingCaseRepository = counselingCaseRepository;
        this.counselingCaseMapper = counselingCaseMapper;
        this.visitorRepository = visitorRepository;
        this.timeReservedRepository = timeReservedRepository;
        this.timeReservedMapper = timeReservedMapper;
        this.planningRepository = planningRepository;
        this.planningMapper = planningMapper1;
        this.taskService = taskService;
        this.taskRepository = taskRepository;
        this.taskMapper = taskMapper;
        this.postRepository = postRepository;
        this.postMapper = postMapper;
        this.visitorMapper = visitorMapper;
    }

    /**
     * Save a counselor.
     *
     * @param counselorDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public CounselorDTO save(CounselorDTO counselorDTO) {
        log.debug("Request to save Counselor : {}", counselorDTO);
        Counselor counselor = counselorMapper.toEntity(counselorDTO);
        counselor = counselorRepository.save(counselor);
        return counselorMapper.toDto(counselor);
    }

    /**
     * Get all the counselors.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<CounselorDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Counselors");
        return counselorRepository.findAll(pageable)
            .map(counselorMapper::toDto);
    }

    /**
     * Get all CounselingCases for one counselor.
     *
     * @param pageable the pagination information.
     * @param id       the id of the entity.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<CounselingCaseDTO> findAllCasesForOneCounselor(Long id, Pageable pageable) {
        log.debug("Request to get all CounselingCases for one counselor");
        return counselingCaseRepository.findVisitorByCounselorId(id, pageable).map(counselingCaseMapper::toDto);
    }

    /**
     * Get one counselor by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CounselorDTO> findOne(Long id) {
        log.debug("Request to get Counselor : {}", id);
        return counselorRepository.findById(id)
            .map(counselorMapper::toDto);
    }

    /**
     * Get visitor information with ID.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<VisitorDTO> findAllVisitorInformation(Long id) {
        log.debug("Request to get visitor information with ID : {}", id);
        Optional<Visitor> visitor = visitorRepository.findUserByVisitorId(id);
        return visitor.map(visitorMapper::toDto);
    }

    /**
     * Get visitor information with ID.
     *
     * @param id       counselor id.
     * @param pageable the pagination information.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TimeReservedDTO> findAllReservedTime(Long id, Pageable pageable) {
        log.debug("Request to get all reserved time for counselor with ID : {}", id);
        Page<TimeReservedDTO> timeReservedDTO = timeReservedRepository.findTimeReservedByCounselorId(id, pageable)
            .map(timeReservedMapper::toDto);
        return timeReservedDTO;
    }

    /**
     * Get the counselor plans with ID.
     *
     * @param id       counselor id.
     * @param pageable the pagination information.
     * @return the entity.
     */

    @Override
    public Page<TaskDTO> findAllCounselorPlans(Long id, Pageable pageable) {
        log.debug("Request to get all reserved time for counselor with ID : {}", id);
        Planning planning = planningRepository.findAllByCounselorId(id);
        return taskRepository.findAllByPlanning(planning, pageable).map(taskMapper::toDto);
    }

    /**
     * Create new counselor plan.
     *
     * @param planningDTO the counselor plan.
     * @return the entity.
     */
    @Override
    public PlanningDTO createNewCounselorPlan(PlanningDTO planningDTO) {
        log.debug("Request to create new counselor plan : {}", planningDTO);
        Planning planning = planningRepository.save(planningMapper.toEntity(planningDTO));
        return planningMapper.toDto(planning);
    }

    /**
     * Update the counselor plan.
     *
     * @param planningDTO the counselor plan.
     * @return the entity.
     */
    @Override
    public PlanningDTO updateCounselorPlan(PlanningDTO planningDTO) {
        log.debug("Request to update counselor plan : {}", planningDTO);
        Planning planning = planningRepository.save(planningMapper.toEntity(planningDTO));
        return planningMapper.toDto(planning);
    }

    /**
     * Delete the counselor plan.
     *
     * @param planId the plan id.
     * @return the entity.
     */
    @Override
    public void deleteCounselorPlan(Long planId) {
        log.debug("Request to delete counselor plan : {}", planId);
        planningRepository.deleteById(planId);
    }

    /**
     * Delete the counselor by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Counselor : {}", id);
        counselorRepository.deleteById(id);
    }

    @Override
    public Page<PostDTO> findCounselorPosts(Pageable pageable, Long id) {
        log.debug("Request to find all counselor posts : {}", id);
        return postRepository.findAllByCounselorId(pageable, id).map(postMapper::toDto);
    }

    @Override
    public PostDTO createCounselorPost(PostDTO postDTO) {
        log.debug("Request to create a new post for counselor : {}", postDTO);
        return postMapper.toDto(postRepository.save(postMapper.toEntity(postDTO)));
    }

    @Override
    public PostDTO updateCounselorPost(PostDTO postDTO) {
        log.debug("Request to update the counselor post : {}", postDTO);
        return postMapper.toDto(postRepository.save(postMapper.toEntity(postDTO)));
    }

    @Override
    public void deleteCounselorPost(Long postId) {
        log.debug("Request to delete the counselor post : {}", postId);
        postRepository.deleteById(postId);
    }
}
