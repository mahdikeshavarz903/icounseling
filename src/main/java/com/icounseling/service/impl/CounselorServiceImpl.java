package com.icounseling.service.impl;

import com.icounseling.domain.*;
import com.icounseling.repository.*;
import com.icounseling.service.CounselorService;
import com.icounseling.service.TaskService;
import com.icounseling.service.dto.*;
import com.icounseling.service.mapper.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
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

    private final UserRepository userRepository;

    private final EducationRepository educationRepository;

    private final ScoreRepository scoreRepository;

    public CounselorServiceImpl(CounselorRepository counselorRepository, CounselorMapper counselorMapper, CounselingCaseRepository counselingCaseRepository, CounselingCaseMapper counselingCaseMapper, VisitorRepository visitorRepository, TimeReservedRepository timeReservedRepository, TimeReservedMapper timeReservedMapper, PlanningMapper planningMapper, PlanningRepository planningRepository, PlanningMapper planningMapper1, TaskService taskService, TaskRepository taskRepository, TaskMapper taskMapper, PostRepository postRepository, PostMapper postMapper, VisitorMapper visitorMapper, UserRepository userRepository, EducationRepository educationRepository, ScoreRepository scoreRepository) {
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

    @Override
    public List<JSONObject> reviewCounselorInformation(Long id, Pageable pageable) {
        log.debug("Request to review counselor information : {}",id);
        List<JSONObject> entities = new ArrayList<>();
        JSONObject userEntity =  new JSONObject();
        JSONObject educationEntity =  new JSONObject();
        JSONObject scoreEntity =  new JSONObject();
        JSONObject counselorEntity =  new JSONObject();

        try {
            Optional<Counselor> counselor = counselorRepository.findById(id);
            if(counselor.isPresent()) {
                counselorEntity.put("consultantType",counselor.get().getConsultantType());

                Optional<User> user = userRepository.findOneWithAuthoritiesById(counselor.get().getUser().getId());
                if (user.isPresent()) {
                    userEntity.put("firstName", user.get().getFirstName());
                    userEntity.put("lastName", user.get().getLastName());
                    userEntity.put("email", user.get().getEmail());
                    userEntity.put("imageUrl", user.get().getImageUrl());
                    userEntity.put("about", user.get().getAbout());
                    userEntity.put("addressToken", user.get().getAddressToken());
                    userEntity.put("age", user.get().getAge());
                    userEntity.put("birthdayDate", user.get().getBirthdayDate());
                    userEntity.put("cover", user.get().getCover());
                    userEntity.put("gender", user.get().getGender());
                    userEntity.put("homePhoneNumber", user.get().getHomePhoneNumber());
                    userEntity.put("nationalCode", user.get().getNationalCode());
                    userEntity.put("nationality", user.get().getNationality());
                    userEntity.put("zipCode", user.get().getZipCode());
                    userEntity.put("langKey", user.get().getLangKey());
                }

                Optional<Education> education = educationRepository.findById(counselor.get().getEducation().getId());
                if(education.isPresent())
                    educationEntity.put("type",education.get().getType());

                Optional<Score> score = scoreRepository.findById(counselor.get().getScore().getId());
                if(score.isPresent()){
                    scoreEntity.put("total",score.get().getTotal());
                    scoreEntity.put("image",score.get().getId());
                    scoreEntity.put("degree",score.get().getDegree());
                }
            }
        }catch (JSONException e) {
            e.printStackTrace();
        }

        entities.add(userEntity);
        entities.add(counselorEntity);
        entities.add(educationEntity);
        entities.add(scoreEntity);

        return entities;
    }
}
