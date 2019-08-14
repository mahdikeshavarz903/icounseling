package com.icounseling.web.rest;

import com.icounseling.ICounselingApp;
import com.icounseling.domain.CounselingCase;
import com.icounseling.domain.Counselor;
import com.icounseling.domain.User;
import com.icounseling.domain.Visitor;
import com.icounseling.domain.enumeration.ConsultantType;
import com.icounseling.domain.enumeration.CounselingCaseStatus;
import com.icounseling.repository.CounselingCaseRepository;
import com.icounseling.repository.CounselorRepository;
import com.icounseling.repository.UserRepository;
import com.icounseling.repository.VisitorRepository;
import com.icounseling.service.CounselorService;
import com.icounseling.service.dto.CounselorDTO;
import com.icounseling.service.mapper.CounselorMapper;
import com.icounseling.web.rest.errors.ExceptionTranslator;
import org.apache.commons.lang3.RandomStringUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

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
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restCounselorMockMvc;

    private Counselor counselor;

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
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Counselor createEntity(EntityManager em) {
        Counselor counselor = new Counselor()
            .consultantType(DEFAULT_CONSULTANT_TYPE);
        return counselor;
    }

    public static CounselingCase createCounselingCaseEntity(EntityManager em) {
        CounselingCase counselingCase = new CounselingCase();
        counselingCase.setCounselor(createEntity(em));
        counselingCase.setStatus(CounselingCaseStatus.OPENED);

        Visitor visitor = new Visitor();
        counselingCase.setVisitor(visitor);

        return counselingCase;
    }

    public static Visitor createVisitorRepository(EntityManager em) {
        Visitor visitor = new Visitor();
        return visitor;
    }
    /**
     * Create an updated entity for this test.
     *
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
        visitor = createVisitorRepository(em);
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
        restCounselorMockMvc.perform((get("/api/counselors/{id}/counseling-case?sort=id,desc", counselor.getId().intValue())))
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
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(hasItem(visitor.getId().intValue())));
//            .andExpect(jsonPath("$.[*].consultantType").value(hasItem(DEFAULT_CONSULTANT_TYPE.toString())));
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
