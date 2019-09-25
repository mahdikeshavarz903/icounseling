package com.icounseling.web.rest;

import com.icounseling.ICounselingApp;
import com.icounseling.domain.*;
import com.icounseling.domain.enumeration.*;
import com.icounseling.repository.*;
import com.icounseling.service.CounselorService;
import com.icounseling.service.dto.CounselorDTO;
import com.icounseling.service.dto.PlanningDTO;
import com.icounseling.service.dto.PostDTO;
import com.icounseling.service.mapper.CounselorMapper;
import com.icounseling.service.mapper.PlanningMapper;
import com.icounseling.service.mapper.PostMapper;
import com.icounseling.web.rest.errors.ExceptionTranslator;
import org.apache.commons.lang3.RandomStringUtils;
import org.h2.table.Plan;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.io.IOException;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

import static com.icounseling.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link CounselorResource} REST controller.
 */
@SpringBootTest(classes = ICounselingApp.class)
public class CounselorResourceIT {

    private static final ConsultantType DEFAULT_CONSULTANT_TYPE = ConsultantType.PSYCHOLOGY;
    private static final ConsultantType UPDATED_CONSULTANT_TYPE = ConsultantType.LEGAL;
    private static final CounselingCaseStatus COUNSELING_CASE_STATUS_OPEN = CounselingCaseStatus.OPENED;
    private static final CounselingCaseStatus COUNSELING_CASE_STATUS_CLOSED = CounselingCaseStatus.CLOSED;
    private static final Instant STARTDATE = Instant.ofEpochMilli(0L);
    private static final Instant ENDDATE = Instant.ofEpochMilli(0L);

    @Autowired
    private CounselorRepository counselorRepository;

    @Autowired
    private CounselorMapper counselorMapper;

    @Autowired
    private CounselingCaseRepository counselingCaseRepository;

    private CounselingCase counselingCase;

    private Visitor visitor;

    @Autowired
    private VisitorRepository visitorRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CounselorService counselorService;

    @Autowired
    private EducationRepository educationRepository;

    @Autowired
    private ScoreRepository scoreRepository;

    @Autowired
    private PlanningRepository planningRepository;

    @Autowired
    private PlanningMapper planningMapper;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private PostMapper postMapper;

    @Autowired
    private TimeReservedRepository timeReservedRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Qualifier("defaultValidator")
    @Autowired
    private Validator validator;

    private MockMvc restCounselorMockMvc;

    private Counselor counselor;

    private TimeReserved timerReserved;

    private Planning planning;

    private Task task;

    private Post post;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CounselorResource counselorResource = new CounselorResource(counselorService);
        this.restCounselorMockMvc = MockMvcBuilders.standaloneSetup(counselorResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Counselor createEntity(EntityManager em) {
        Counselor counselor = new Counselor()
            .consultantType(DEFAULT_CONSULTANT_TYPE);
        return counselor;
    }

    public static Post createPostEntity(EntityManager em) {
        Post post = new Post()
            .image(TestUtil.createByteArray(1, "0"))
            .imageContentType("image/jpg")
            .documentFormat(DocumentFormat.PDF);
        return post;
    }

    public static CounselingCase createCounselingCaseEntity(EntityManager em) {
        CounselingCase counselingCase = new CounselingCase();
        counselingCase.setCounselor(createEntity(em));
        counselingCase.setStatus(CounselingCaseStatus.OPENED);

        Visitor visitor = new Visitor();
        counselingCase.setVisitor(visitor);

        return counselingCase;
    }

    public static Visitor createVisitorEntity(EntityManager em) {
        Visitor visitor = new Visitor();
        return visitor;
    }

    public static TimeReserved createTimeReservedEntity(EntityManager em) {
        TimeReserved timeReserved = new TimeReserved()
            .description("AAAAAAAAAA")
            .dateTime(Instant.ofEpochMilli(0L));
        return timeReserved;
    }

    public static Planning createPlanningEntity(EntityManager em) {

        Planning planning = new Planning()
            .title("AAAAAAAAAA")
            .startDateTime(STARTDATE)
            .endDateTime(ENDDATE)
            .description("AAAAAAAAAA");
        return planning;
    }

    public static Task createTaskEntity(EntityManager em) {
        Task task = new Task()
            .repeatTime(RepeatTime.NONE)
            .repeatUntil(RepeatUntil.NO_END_DATE);
        return task;
    }

    /**
     * Create an updated entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Counselor createUpdatedEntity(EntityManager em) {
        Counselor counselor = new Counselor()
            .consultantType(UPDATED_CONSULTANT_TYPE);
        return counselor;
    }

    @BeforeEach
    public void initTest() {
        counselingCase = createCounselingCaseEntity(em);
        counselor = createEntity(em);
        visitor = createVisitorEntity(em);
        timerReserved = createTimeReservedEntity(em);
        planning = createPlanningEntity(em);
        task = createTaskEntity(em);
        post = createPostEntity(em);
    }

    @Test
    @Transactional
    public void createCounselor() throws Exception {
        int databaseSizeBeforeCreate = counselorRepository.findAll().size();

        // Create the Counselor
        CounselorDTO counselorDTO = counselorMapper.toDto(counselor);
        restCounselorMockMvc.perform(post("/api/counselors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(counselorDTO)))
            .andExpect(status().isCreated());

        // Validate the Counselor in the database
        List<Counselor> counselorList = counselorRepository.findAll();
        assertThat(counselorList).hasSize(databaseSizeBeforeCreate + 1);
        Counselor testCounselor = counselorList.get(counselorList.size() - 1);
        assertThat(testCounselor.getConsultantType()).isEqualTo(DEFAULT_CONSULTANT_TYPE);
    }

    @Test
    @Transactional
    public void createCounselorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = counselorRepository.findAll().size();

        // Create the Counselor with an existing ID
        counselor.setId(1L);
        CounselorDTO counselorDTO = counselorMapper.toDto(counselor);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCounselorMockMvc.perform(post("/api/counselors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(counselorDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Counselor in the database
        List<Counselor> counselorList = counselorRepository.findAll();
        assertThat(counselorList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkConsultantTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = counselorRepository.findAll().size();
        // set the field null
        counselor.setConsultantType(null);

        // Create the Counselor, which fails.
        CounselorDTO counselorDTO = counselorMapper.toDto(counselor);

        restCounselorMockMvc.perform(post("/api/counselors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(counselorDTO)))
            .andExpect(status().isBadRequest());

        List<Counselor> counselorList = counselorRepository.findAll();
        assertThat(counselorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCounselors() throws Exception {
        // Initialize the database
        counselorRepository.saveAndFlush(counselor);

        // Get all the counselorList
        restCounselorMockMvc.perform(get("/api/counselors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(counselor.getId().intValue())))
            .andExpect(jsonPath("$.[*].consultantType").value(hasItem(DEFAULT_CONSULTANT_TYPE.toString())));
    }

    @Test
    @Transactional
    public void getAllCasesForOneCounselor() throws Exception {
        // Initialize the database
        counselingCaseRepository.saveAndFlush(counselingCase);

        CounselingCase counselingCase2 = createCounselingCaseEntity(em);
        CounselingCase counselingCase3 = createCounselingCaseEntity(em);

        Counselor counselor = createEntity(em);
        Visitor visitor2 = new Visitor();
        Visitor visitor3 = new Visitor();

        counselingCase2.setCounselor(counselor);
        counselingCase2.setVisitor(visitor2);
        counselingCase2.setStatus(CounselingCaseStatus.OPENED);

        counselingCase3.setCounselor(counselor);
        counselingCase3.setVisitor(visitor3);
        counselingCase3.setStatus(CounselingCaseStatus.CLOSED);

        counselingCaseRepository.save(counselingCase2);
        counselingCaseRepository.save(counselingCase3);

        // get all counseling cases
        restCounselorMockMvc.perform((get("/api/counselors/1/counseling-case?sort=id,desc")))
            //restCounselorMockMvc.perform((get("/api/counselors/{id}/counseling-case?sort=id,desc", counselor.getId().intValue())))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE));
//            .andExpect(jsonPath("$.[*].id").value(hasItem(visitor2.getId().intValue())));
//            .andExpect(jsonPath("$.[*].status").value(hasItem(COUNSELING_CASE_STATUS_OPEN.toString())));
//            .andExpect(jsonPath("$.[*].visitor").value(counselingCase.getVisitor().getId().intValue()))
//            .andExpect(jsonPath("$.[*].counselor").value(counselingCase.getCounselor().getId().intValue()));
    }

    @Test
    @Transactional
    public void getCounselor() throws Exception {
        // Initialize the database
        counselorRepository.saveAndFlush(counselor);

        // Get the counselor
        restCounselorMockMvc.perform(get("/api/counselors/{id}", counselor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(counselor.getId().intValue()))
            .andExpect(jsonPath("$.consultantType").value(DEFAULT_CONSULTANT_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getAllVisitorInformation() throws Exception {
        // Initialize variables
        User user = new User();
        user.setId(4L);
        user.setLogin("09193446830");
        user.setPassword(RandomStringUtils.random(60));
        user.setActivated(true);
        user.setEmail("Mahdikeshavarz@gmail.com");
        user.setFirstName("Mahdi");
        user.setLastName("Keshavarz");
        user.setImageUrl("http://placehold.it/50x50");
        user.setLangKey("en");
        visitor.setUser(user);

        // Initialize the database
        userRepository.saveAndFlush(user);
        visitorRepository.saveAndFlush(visitor);

        // Get all the counselorList
        restCounselorMockMvc.perform(get("/api/counselors/visitors/{id}", visitor.getId().intValue()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE));
        //.andExpect(jsonPath("$.[*].id").value(hasItem(visitor.getId().intValue())));
//            .andExpect(jsonPath("$.[*].consultantType").value(hasItem(DEFAULT_CONSULTANT_TYPE.toString())));
    }

    @Test
    @Transactional
    public void getAllReservedTimes() throws Exception {
        timeReservedRepository.saveAndFlush(timerReserved);
        counselorRepository.saveAndFlush(counselor);

        timerReserved.setCounselor(counselor);

        restCounselorMockMvc.perform(get("/api/counselors/{id}/reserved-times?sort=id,desc", counselor.getId().intValue()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE));
    }

    @Test
    @Transactional
    public void getAllPlans() throws Exception {
        planningRepository.saveAndFlush(planning);
        taskRepository.saveAndFlush(task);
        counselorRepository.saveAndFlush(counselor);

        planning.setCounselor(counselor);

        RepeatTime rt = RepeatTime.NONE;
        RepeatUntil ru = RepeatUntil.NO_END_DATE;
        task.setPlanning(planning);
        task.setRepeatTime(rt);
        task.setRepeatUntil(ru);

        restCounselorMockMvc.perform(get("/api/counselors/{id}/all-plans?sort=id,desc", counselor.getId().intValue()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(task.getId().intValue())))
            .andExpect(jsonPath("$.[*].repeatTime").value(hasItem(rt.toString())))
            .andExpect(jsonPath("$.[*].repeatUntil").value(hasItem(ru.toString())));
    }

    @Test
    @Transactional
    public void createNewPlan() throws Exception {
        int databaseSizeBeforeCreate = planningRepository.findAll().size();
        counselorRepository.saveAndFlush(counselor);
        PlanningDTO planningDTO = planningMapper.toDto(planning);

        restCounselorMockMvc.perform(post("/api/counselors/create-plan")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(planningDTO)))
            .andExpect(status().isCreated());

        List<Planning> plannings = planningRepository.findAll();
        Planning test = plannings.get(plannings.size() - 1);
        assertThat(plannings).hasSize(databaseSizeBeforeCreate + 1);
        assertThat(test.getDescription()).isEqualTo("AAAAAAAAAA");
        assertThat(test.getStartDateTime()).isEqualTo(STARTDATE);
        assertThat(test.getEndDateTime()).isEqualTo(ENDDATE);
        assertThat(test.getTitle()).isEqualTo("AAAAAAAAAA");
    }

    @Test
    @Transactional
    public void updateCounselorPlan() throws Exception {
        counselorRepository.saveAndFlush(counselor);
        planningRepository.saveAndFlush(planning);

        int databaseSizeBeforeCreate = planningRepository.findAll().size();

        Planning plannings = planningRepository.findById(planning.getId()).get();

        em.detach(planning);
        plannings.setDescription("asdf");

        PlanningDTO planningDTO = planningMapper.toDto(planning);

        restCounselorMockMvc.perform(put("/api/counselors/create-plan")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(planningDTO)))
            .andExpect(status().isOk());

        // Validate the Counselor in the database
        List<Planning> planningList = planningRepository.findAll();
        Planning test = planningList.get(planningList.size() - 1);
        assertThat(planningList).hasSize(databaseSizeBeforeCreate);
        assertThat(test.getDescription()).isEqualTo("asdf");
        assertThat(test.getStartDateTime()).isEqualTo(STARTDATE);
        assertThat(test.getEndDateTime()).isEqualTo(ENDDATE);
        assertThat(test.getTitle()).isEqualTo("AAAAAAAAAA");
    }

    @Test
    @Transactional
    public void deleteCounselorPlan() throws Exception {
        // Initialize the database
        counselorRepository.saveAndFlush(counselor);
        planningRepository.saveAndFlush(planning);

        int databaseSizeBeforeDelete = counselorRepository.findAll().size();

//        // Delete the counselor
//        restCounselorMockMvc.perform(delete("/api/counselors/remove-plan/{planId}", counselor.getId().intValue())
//            .accept(TestUtil.APPLICATION_JSON_UTF8))
//            .andExpect(status().isNoContent());
//
//        // Validate the database contains one less item
//        List<Planning> planningList = planningRepository.findAll();
//        assertThat(planningList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void getAllPosts() throws Exception {
        postRepository.saveAndFlush(post);
        counselorRepository.saveAndFlush(counselor);

        post.setCounselor(counselor);

        restCounselorMockMvc.perform(get("/api/counselors/{id}/posts?sort=id,desc", counselor.getId().intValue()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(post.getId().intValue())));
//            .andExpect(jsonPath("$.[*].image").value(hasItem(rt.toString())))
//            .andExpect(jsonPath("$.[*].repeatUntil").value(hasItem(ru.toString())));
    }

    @Test
    @Transactional
    public void createNewPost() throws Exception {
        int dbSize = postRepository.findAll().size();

        counselorRepository.saveAndFlush(counselor);

        PostDTO postDTO = postMapper.toDto(post);

        restCounselorMockMvc.perform((post("/api/counselors/create-post"))
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(postDTO)))
            .andExpect(status().isCreated());

        List<Post> postDTOS = postRepository.findAll();
        Post lastPost = postDTOS.get(postDTOS.size() - 1);
        assertThat(postDTOS).hasSize(dbSize + 1);
        assertThat(lastPost.getImageContentType()).isEqualTo("image/jpg");
        assertThat(lastPost.getDocumentFormat()).isEqualTo(DocumentFormat.PDF);
    }

    @Test
    @Transactional
    public void updateCounselorPost() throws Exception {
        counselorRepository.saveAndFlush(counselor);
        postRepository.saveAndFlush(post);

        int databaseSizeBeforeCreate = postRepository.findAll().size();

        Post p = postRepository.findById(post.getId()).get();

        em.detach(p);
        p.setDocumentFormat(DocumentFormat.DOC);
        p.imageContentType("image/png");

        PostDTO postDTO = postMapper.toDto(post);

        restCounselorMockMvc.perform(put("/api/counselors/create-post")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(postDTO)))
            .andExpect(status().isOk());

        // Validate the Counselor in the database
        List<Post> postList = postRepository.findAll();
        Post test = postList.get(postList.size() - 1);
        assertThat(postList).hasSize(databaseSizeBeforeCreate);
        assertThat(test.getImageContentType()).isEqualTo("image/png");
        assertThat(test.getDocumentFormat()).isEqualTo(DocumentFormat.DOC);
    }

    @Test
    @Transactional
    public void reviewCounselorInformation() throws Exception {
        counselorRepository.saveAndFlush(counselor);

        byte[] defaultImage = TestUtil.createByteArray(1, "0");

        Score score = new Score()
            .total(1F)
            .image(defaultImage)
            .imageContentType("image/jpg")
            .degree(ScoreDegree.PROFESSIONAL);

        Education education = new Education();
        education.setType(EducationDegree.ASSOCIATE_DEGREE);

        educationRepository.saveAndFlush(education);
        scoreRepository.saveAndFlush(score);

        counselor.setEducation(education);
        counselor.setScore(score);

        restCounselorMockMvc.perform(get("/api/counselors/{id}/review-counselor-information",counselor.getId().intValue()))
            .andExpect(status().isOk());
    }

    @Test
    @Transactional
    public void deleteCounselorPost() throws Exception {
        postRepository.saveAndFlush(post);

        int dbSize = postRepository.findAll().size();

        restCounselorMockMvc.perform((delete("/api/counselors/remove-post/{postId}", post.getId().intValue()))
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        List<Post> postList = postRepository.findAll();
        assertThat(postList).hasSize(dbSize - 1);
    }

    @Test
    @Transactional
    public void getNonExistingCounselor() throws Exception {
        // Get the counselor
        restCounselorMockMvc.perform(get("/api/counselors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCounselor() throws Exception {
        // Initialize the database
        counselorRepository.saveAndFlush(counselor);

        int databaseSizeBeforeUpdate = counselorRepository.findAll().size();

        // Update the counselor
        Counselor updatedCounselor = counselorRepository.findById(counselor.getId()).get();
        // Disconnect from session so that the updates on updatedCounselor are not directly saved in db
        em.detach(updatedCounselor);
        updatedCounselor
            .consultantType(UPDATED_CONSULTANT_TYPE);
        CounselorDTO counselorDTO = counselorMapper.toDto(updatedCounselor);

        restCounselorMockMvc.perform(put("/api/counselors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(counselorDTO)))
            .andExpect(status().isOk());

        // Validate the Counselor in the database
        List<Counselor> counselorList = counselorRepository.findAll();
        assertThat(counselorList).hasSize(databaseSizeBeforeUpdate);
        Counselor testCounselor = counselorList.get(counselorList.size() - 1);
        assertThat(testCounselor.getConsultantType()).isEqualTo(UPDATED_CONSULTANT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingCounselor() throws Exception {
        int databaseSizeBeforeUpdate = counselorRepository.findAll().size();

        // Create the Counselor
        CounselorDTO counselorDTO = counselorMapper.toDto(counselor);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCounselorMockMvc.perform(put("/api/counselors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(counselorDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Counselor in the database
        List<Counselor> counselorList = counselorRepository.findAll();
        assertThat(counselorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCounselor() throws Exception {
        // Initialize the database
        counselorRepository.saveAndFlush(counselor);

        int databaseSizeBeforeDelete = counselorRepository.findAll().size();

        // Delete the counselor
        restCounselorMockMvc.perform(delete("/api/counselors/{id}", counselor.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Counselor> counselorList = counselorRepository.findAll();
        assertThat(counselorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Counselor.class);
        Counselor counselor1 = new Counselor();
        counselor1.setId(1L);
        Counselor counselor2 = new Counselor();
        counselor2.setId(counselor1.getId());
        assertThat(counselor1).isEqualTo(counselor2);
        counselor2.setId(2L);
        assertThat(counselor1).isNotEqualTo(counselor2);
        counselor1.setId(null);
        assertThat(counselor1).isNotEqualTo(counselor2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CounselorDTO.class);
        CounselorDTO counselorDTO1 = new CounselorDTO();
        counselorDTO1.setId(1L);
        CounselorDTO counselorDTO2 = new CounselorDTO();
        assertThat(counselorDTO1).isNotEqualTo(counselorDTO2);
        counselorDTO2.setId(counselorDTO1.getId());
        assertThat(counselorDTO1).isEqualTo(counselorDTO2);
        counselorDTO2.setId(2L);
        assertThat(counselorDTO1).isNotEqualTo(counselorDTO2);
        counselorDTO1.setId(null);
        assertThat(counselorDTO1).isNotEqualTo(counselorDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(counselorMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(counselorMapper.fromId(null)).isNull();
    }
}
