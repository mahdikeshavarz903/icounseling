package com.icounseling.web.rest;

import com.icounseling.ICounselingApp;
import com.icounseling.domain.CounselingCase;
import com.icounseling.domain.Counselor;
import com.icounseling.domain.Visitor;
import com.icounseling.domain.enumeration.ConsultantType;
import com.icounseling.domain.enumeration.CounselingCaseStatus;
import com.icounseling.repository.CounselingCaseRepository;
import com.icounseling.repository.CounselorRepository;
import com.icounseling.repository.VisitorRepository;
import com.icounseling.service.CounselingCaseService;
import com.icounseling.service.dto.CounselingCaseDTO;
import com.icounseling.service.mapper.CounselingCaseMapper;
import com.icounseling.web.rest.errors.ExceptionTranslator;
import org.checkerframework.checker.units.qual.A;
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
 * Integration tests for the {@link CounselingCaseResource} REST controller.
 */
@SpringBootTest(classes = ICounselingApp.class)
public class CounselingCaseResourceIT {

    private static final CounselingCaseStatus DEFAULT_STATUS = CounselingCaseStatus.OPENED;
    private static final CounselingCaseStatus UPDATED_STATUS = CounselingCaseStatus.CLOSED;

    @Autowired
    private CounselingCaseRepository counselingCaseRepository;

    @Autowired
    private CounselingCaseMapper counselingCaseMapper;

    @Autowired
    private CounselingCaseService counselingCaseService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private VisitorRepository visitorRepository;

    @Autowired
    private CounselorRepository counselorRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restCounselingCaseMockMvc;

    private CounselingCase counselingCase;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CounselingCaseResource counselingCaseResource = new CounselingCaseResource(counselingCaseService);
        this.restCounselingCaseMockMvc = MockMvcBuilders.standaloneSetup(counselingCaseResource)
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
    public static CounselingCase createEntity(EntityManager em) {
        CounselingCase counselingCase = new CounselingCase()
            .status(DEFAULT_STATUS);
        return counselingCase;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CounselingCase createUpdatedEntity(EntityManager em) {
        CounselingCase counselingCase = new CounselingCase()
            .status(UPDATED_STATUS);
        return counselingCase;
    }

    @BeforeEach
    public void initTest() {
        counselingCase = createEntity(em);
    }

    @Test
    @Transactional
    public void createCounselingCase() throws Exception {
        int databaseSizeBeforeCreate = counselingCaseRepository.findAll().size();

        Visitor visitor = new Visitor();
        visitorRepository.saveAndFlush(visitor);

        Counselor counselor = new Counselor();
        counselor.consultantType(ConsultantType.LEGAL);
        counselorRepository.saveAndFlush(counselor);

        counselingCase.setVisitor(visitor);
        counselingCase.setCounselor(counselor);

        // Create the CounselingCase
        CounselingCaseDTO counselingCaseDTO = counselingCaseMapper.toDto(counselingCase);
        restCounselingCaseMockMvc.perform(post("/api/counseling-cases")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(counselingCaseDTO)))
            .andExpect(status().isCreated());

        // Validate the CounselingCase in the database
        List<CounselingCase> counselingCaseList = counselingCaseRepository.findAll();
        assertThat(counselingCaseList).hasSize(databaseSizeBeforeCreate + 1);
        CounselingCase testCounselingCase = counselingCaseList.get(counselingCaseList.size() - 1);
        assertThat(testCounselingCase.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createCounselingCaseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = counselingCaseRepository.findAll().size();

        Visitor visitor = new Visitor();
        visitorRepository.saveAndFlush(visitor);

        Counselor counselor = new Counselor();
        counselor.consultantType(ConsultantType.LEGAL);
        counselorRepository.saveAndFlush(counselor);

        counselingCase.setVisitor(visitor);
        counselingCase.setCounselor(counselor);

        // Create the CounselingCase with an existing ID
        counselingCase.setId(1L);
        CounselingCaseDTO counselingCaseDTO = counselingCaseMapper.toDto(counselingCase);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCounselingCaseMockMvc.perform(post("/api/counseling-cases")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(counselingCaseDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CounselingCase in the database
        List<CounselingCase> counselingCaseList = counselingCaseRepository.findAll();
        assertThat(counselingCaseList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = counselingCaseRepository.findAll().size();
        // set the field null
        counselingCase.setStatus(null);

        // Create the CounselingCase, which fails.
        CounselingCaseDTO counselingCaseDTO = counselingCaseMapper.toDto(counselingCase);

        restCounselingCaseMockMvc.perform(post("/api/counseling-cases")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(counselingCaseDTO)))
            .andExpect(status().isBadRequest());

        List<CounselingCase> counselingCaseList = counselingCaseRepository.findAll();
        assertThat(counselingCaseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCounselingCases() throws Exception {
        // Initialize the database
        counselingCaseRepository.saveAndFlush(counselingCase);

        // Get all the counselingCaseList
        restCounselingCaseMockMvc.perform(get("/api/counseling-cases?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(counselingCase.getId().intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }

    @Test
    @Transactional
    public void getCounselingCase() throws Exception {
        // Initialize the database
        counselingCaseRepository.saveAndFlush(counselingCase);

        // Get the counselingCase
        restCounselingCaseMockMvc.perform(get("/api/counseling-cases/{id}", counselingCase.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(counselingCase.getId().intValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCounselingCase() throws Exception {
        // Get the counselingCase
        restCounselingCaseMockMvc.perform(get("/api/counseling-cases/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCounselingCase() throws Exception {
        // Initialize the database
        Visitor visitor = new Visitor();
        visitorRepository.saveAndFlush(visitor);

        Counselor counselor = new Counselor();
        counselor.consultantType(ConsultantType.LEGAL);
        counselorRepository.saveAndFlush(counselor);

        counselingCase.setVisitor(visitor);
        counselingCase.setCounselor(counselor);

        counselingCaseRepository.saveAndFlush(counselingCase);

        int databaseSizeBeforeUpdate = counselingCaseRepository.findAll().size();

        // Update the counselingCase
        CounselingCase updatedCounselingCase = counselingCaseRepository.findById(counselingCase.getId()).get();
        // Disconnect from session so that the updates on updatedCounselingCase are not directly saved in db
        em.detach(updatedCounselingCase);
        updatedCounselingCase
            .status(UPDATED_STATUS);
        CounselingCaseDTO counselingCaseDTO = counselingCaseMapper.toDto(updatedCounselingCase);

        restCounselingCaseMockMvc.perform(put("/api/counseling-cases")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(counselingCaseDTO)))
            .andExpect(status().isOk());

        // Validate the CounselingCase in the database
        List<CounselingCase> counselingCaseList = counselingCaseRepository.findAll();
        assertThat(counselingCaseList).hasSize(databaseSizeBeforeUpdate);
        CounselingCase testCounselingCase = counselingCaseList.get(counselingCaseList.size() - 1);
        assertThat(testCounselingCase.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingCounselingCase() throws Exception {
        int databaseSizeBeforeUpdate = counselingCaseRepository.findAll().size();

        // Create the CounselingCase
        CounselingCaseDTO counselingCaseDTO = counselingCaseMapper.toDto(counselingCase);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCounselingCaseMockMvc.perform(put("/api/counseling-cases")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(counselingCaseDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CounselingCase in the database
        List<CounselingCase> counselingCaseList = counselingCaseRepository.findAll();
        assertThat(counselingCaseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCounselingCase() throws Exception {
        // Initialize the database
        counselingCaseRepository.saveAndFlush(counselingCase);

        int databaseSizeBeforeDelete = counselingCaseRepository.findAll().size();

        // Delete the counselingCase
        restCounselingCaseMockMvc.perform(delete("/api/counseling-cases/{id}", counselingCase.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CounselingCase> counselingCaseList = counselingCaseRepository.findAll();
        assertThat(counselingCaseList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CounselingCase.class);
        CounselingCase counselingCase1 = new CounselingCase();
        counselingCase1.setId(1L);
        CounselingCase counselingCase2 = new CounselingCase();
        counselingCase2.setId(counselingCase1.getId());
        assertThat(counselingCase1).isEqualTo(counselingCase2);
        counselingCase2.setId(2L);
        assertThat(counselingCase1).isNotEqualTo(counselingCase2);
        counselingCase1.setId(null);
        assertThat(counselingCase1).isNotEqualTo(counselingCase2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CounselingCaseDTO.class);
        CounselingCaseDTO counselingCaseDTO1 = new CounselingCaseDTO();
        counselingCaseDTO1.setId(1L);
        CounselingCaseDTO counselingCaseDTO2 = new CounselingCaseDTO();
        assertThat(counselingCaseDTO1).isNotEqualTo(counselingCaseDTO2);
        counselingCaseDTO2.setId(counselingCaseDTO1.getId());
        assertThat(counselingCaseDTO1).isEqualTo(counselingCaseDTO2);
        counselingCaseDTO2.setId(2L);
        assertThat(counselingCaseDTO1).isNotEqualTo(counselingCaseDTO2);
        counselingCaseDTO1.setId(null);
        assertThat(counselingCaseDTO1).isNotEqualTo(counselingCaseDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(counselingCaseMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(counselingCaseMapper.fromId(null)).isNull();
    }
}
