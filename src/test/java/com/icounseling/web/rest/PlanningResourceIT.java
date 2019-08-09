package com.icounseling.web.rest;

import com.icounseling.ICounselingApp;
import com.icounseling.domain.Planning;
import com.icounseling.repository.PlanningRepository;
import com.icounseling.service.PlanningService;
import com.icounseling.service.dto.PlanningDTO;
import com.icounseling.service.mapper.PlanningMapper;
import com.icounseling.web.rest.errors.ExceptionTranslator;
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
 * Integration tests for the {@link PlanningResource} REST controller.
 */
@SpringBootTest(classes = ICounselingApp.class)
public class PlanningResourceIT {

    @Autowired
    private PlanningRepository planningRepository;

    @Autowired
    private PlanningMapper planningMapper;

    @Autowired
    private PlanningService planningService;

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

    private MockMvc restPlanningMockMvc;

    private Planning planning;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PlanningResource planningResource = new PlanningResource(planningService);
        this.restPlanningMockMvc = MockMvcBuilders.standaloneSetup(planningResource)
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
    public static Planning createEntity(EntityManager em) {
        Planning planning = new Planning();
        return planning;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Planning createUpdatedEntity(EntityManager em) {
        Planning planning = new Planning();
        return planning;
    }

    @BeforeEach
    public void initTest() {
        planning = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlanning() throws Exception {
        int databaseSizeBeforeCreate = planningRepository.findAll().size();

        // Create the Planning
        PlanningDTO planningDTO = planningMapper.toDto(planning);
        restPlanningMockMvc.perform(post("/api/plannings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(planningDTO)))
            .andExpect(status().isCreated());

        // Validate the Planning in the database
        List<Planning> planningList = planningRepository.findAll();
        assertThat(planningList).hasSize(databaseSizeBeforeCreate + 1);
        Planning testPlanning = planningList.get(planningList.size() - 1);
    }

    @Test
    @Transactional
    public void createPlanningWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = planningRepository.findAll().size();

        // Create the Planning with an existing ID
        planning.setId(1L);
        PlanningDTO planningDTO = planningMapper.toDto(planning);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlanningMockMvc.perform(post("/api/plannings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(planningDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Planning in the database
        List<Planning> planningList = planningRepository.findAll();
        assertThat(planningList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPlannings() throws Exception {
        // Initialize the database
        planningRepository.saveAndFlush(planning);

        // Get all the planningList
        restPlanningMockMvc.perform(get("/api/plannings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(planning.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getPlanning() throws Exception {
        // Initialize the database
        planningRepository.saveAndFlush(planning);

        // Get the planning
        restPlanningMockMvc.perform(get("/api/plannings/{id}", planning.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(planning.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPlanning() throws Exception {
        // Get the planning
        restPlanningMockMvc.perform(get("/api/plannings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlanning() throws Exception {
        // Initialize the database
        planningRepository.saveAndFlush(planning);

        int databaseSizeBeforeUpdate = planningRepository.findAll().size();

        // Update the planning
        Planning updatedPlanning = planningRepository.findById(planning.getId()).get();
        // Disconnect from session so that the updates on updatedPlanning are not directly saved in db
        em.detach(updatedPlanning);
        PlanningDTO planningDTO = planningMapper.toDto(updatedPlanning);

        restPlanningMockMvc.perform(put("/api/plannings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(planningDTO)))
            .andExpect(status().isOk());

        // Validate the Planning in the database
        List<Planning> planningList = planningRepository.findAll();
        assertThat(planningList).hasSize(databaseSizeBeforeUpdate);
        Planning testPlanning = planningList.get(planningList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingPlanning() throws Exception {
        int databaseSizeBeforeUpdate = planningRepository.findAll().size();

        // Create the Planning
        PlanningDTO planningDTO = planningMapper.toDto(planning);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlanningMockMvc.perform(put("/api/plannings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(planningDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Planning in the database
        List<Planning> planningList = planningRepository.findAll();
        assertThat(planningList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePlanning() throws Exception {
        // Initialize the database
        planningRepository.saveAndFlush(planning);

        int databaseSizeBeforeDelete = planningRepository.findAll().size();

        // Delete the planning
        restPlanningMockMvc.perform(delete("/api/plannings/{id}", planning.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Planning> planningList = planningRepository.findAll();
        assertThat(planningList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Planning.class);
        Planning planning1 = new Planning();
        planning1.setId(1L);
        Planning planning2 = new Planning();
        planning2.setId(planning1.getId());
        assertThat(planning1).isEqualTo(planning2);
        planning2.setId(2L);
        assertThat(planning1).isNotEqualTo(planning2);
        planning1.setId(null);
        assertThat(planning1).isNotEqualTo(planning2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PlanningDTO.class);
        PlanningDTO planningDTO1 = new PlanningDTO();
        planningDTO1.setId(1L);
        PlanningDTO planningDTO2 = new PlanningDTO();
        assertThat(planningDTO1).isNotEqualTo(planningDTO2);
        planningDTO2.setId(planningDTO1.getId());
        assertThat(planningDTO1).isEqualTo(planningDTO2);
        planningDTO2.setId(2L);
        assertThat(planningDTO1).isNotEqualTo(planningDTO2);
        planningDTO1.setId(null);
        assertThat(planningDTO1).isNotEqualTo(planningDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(planningMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(planningMapper.fromId(null)).isNull();
    }
}
