package com.icounseling.service.impl;

import com.icounseling.domain.*;
import com.icounseling.repository.*;
import com.icounseling.service.CounselorService;
import com.icounseling.service.TaskService;
import com.icounseling.service.dto.*;
import com.icounseling.service.dto.custom.CustomCounselingCaseDTO;
import com.icounseling.service.dto.custom.CustomCounselorDTO;
import com.icounseling.service.dto.custom.CustomTaskDTO;
import com.icounseling.service.dto.custom.CustomVisitorDTO;
import com.icounseling.service.mapper.*;
import com.icounseling.service.mapper.custom.CustomCounselingCaseMapper;
import com.icounseling.service.mapper.custom.CustomCounselorMapper;
import com.icounseling.service.mapper.custom.CustomTaskMapper;
import com.icounseling.service.mapper.custom.CustomVisitorMapper;
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

    private final CustomCounselingCaseMapper customCounselingCaseMapper;

    private final VisitorRepository visitorRepository;

    private final TimeReservedRepository timeReservedRepository;

    private final TimeReservedMapper timeReservedMapper;

    private final CustomCounselorMapper customCounselorDTO;

    private final PlanningRepository planningRepository;

    private final PlanningMapper planningMapper;

    private final TaskService taskService;

    private final TaskRepository taskRepository;

    private final CustomTaskMapper customTaskMapper;

    private final CounselingCaseMapper counselingCaseMapper;

    private final PostRepository postRepository;

    private final PostMapper postMapper;

    private final CustomVisitorMapper customVisitorMapper;

    private final UserRepository userRepository;

    private final EducationRepository educationRepository;

    private final ScoreRepository scoreRepository;

    public CounselorServiceImpl(CounselorRepository counselorRepository, CounselorMapper counselorMapper, CounselingCaseRepository counselingCaseRepository, CustomCounselingCaseMapper customCounselingCaseMapper, VisitorRepository visitorRepository, TimeReservedRepository timeReservedRepository, TimeReservedMapper timeReservedMapper, PlanningMapper planningMapper, CustomCounselorMapper customCounselorDTO, PlanningRepository planningRepository, PlanningMapper planningMapper1, TaskService taskService, TaskRepository taskRepository, CustomTaskMapper customTaskMapper, CounselingCaseMapper counselingCaseMapper, PostRepository postRepository, PostMapper postMapper, CustomVisitorMapper customVisitorMapper, UserRepository userRepository, EducationRepository educationRepository, ScoreRepository scoreRepository) {
        this.counselorRepository = counselorRepository;
        this.counselorMapper = counselorMapper;
        this.counselingCaseRepository = counselingCaseRepository;
        this.customCounselingCaseMapper = customCounselingCaseMapper;
        this.visitorRepository = visitorRepository;
        this.timeReservedRepository = timeReservedRepository;
        this.timeReservedMapper = timeReservedMapper;
        this.customCounselorDTO = customCounselorDTO;
        this.planningRepository = planningRepository;
        this.planningMapper = planningMapper1;
        this.taskService = taskService;
        this.taskRepository = taskRepository;
        this.customTaskMapper = customTaskMapper;
        this.counselingCaseMapper = counselingCaseMapper;
        this.postRepository = postRepository;
        this.postMapper = postMapper;
        this.customVisitorMapper = customVisitorMapper;
        this.userRepository = userRepository;
        this.educationRepository = educationRepository;
        this.scoreRepository = scoreRepository;
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
    public Page<CustomCounselingCaseDTO> findAllCasesForOneCounselor(Long id, Pageable pageable) {
        log.debug("Request to get all CounselingCases for one counselor");
        return counselingCaseRepository.findVisitorByCounselorId(id, pageable).map(customCounselingCaseMapper::toDto);
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
    public Optional<CustomVisitorDTO> findAllVisitorInformation(Long id) {
        log.debug("Request to get visitor information with ID : {}", id);
        Optional<Visitor> visitor = visitorRepository.findUserByVisitorId(id);
        return visitor.map(customVisitorMapper::toDto);
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
    public Page<CustomTaskDTO> findAllCounselorPlans(Long id, Pageable pageable) {
        log.debug("Request to get all reserved time for counselor with ID : {}", id);
        Planning planning = planningRepository.findAllByCounselorId(id);
        return taskRepository.findAllByPlanning(planning, pageable).map(customTaskMapper::toDto);
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

    /**
     * Find the counselor posts with ID.
     *
     * @param id       counselor id.
     * @param pageable the pagination information.
     * @return the Post entity.
     */
    @Override
    public Page<PostDTO> findCounselorPosts(Pageable pageable, Long id) {
        log.debug("Request to find all counselor posts : {}", id);
        return postRepository.findAllByCounselorId(pageable, id).map(postMapper::toDto);
    }

    /**
     * Create the counselor post with postDTO.
     *
     * @param postDTO  create a new post for counselor
     *
     * @return the entity.
     */
    @Override
    public PostDTO createCounselorPost(PostDTO postDTO) {
        log.debug("Request to create a new post for counselor : {}", postDTO);
        return postMapper.toDto(postRepository.save(postMapper.toEntity(postDTO)));
    }

    /**
     * Update the counselor post with postDTO.
     *
     * @param postDTO  update post for counselor
     *
     * @return the entity.
     */
    @Override
    public PostDTO updateCounselorPost(PostDTO postDTO) {
        log.debug("Request to update the counselor post : {}", postDTO);
        return postMapper.toDto(postRepository.save(postMapper.toEntity(postDTO)));
    }

    /**
     * Delete the counselor post with ID.
     *
     * @param postId  post id
     *
     */
    @Override
    public void deleteCounselorPost(Long postId) {
        log.debug("Request to delete the counselor post : {}", postId);
        postRepository.deleteById(postId);
    }

    /**
     * Get the counselor information with ID.
     *
     * @param id  counselor id
     *
     * @return the entity.
     */
    @Override
    public Optional<CustomCounselorDTO> reviewCounselorInformation(Long id) {
        log.debug("Request to review counselor information : {}", id);
        return counselorRepository.findById(id).map(customCounselorDTO::toDto);
    }
}
