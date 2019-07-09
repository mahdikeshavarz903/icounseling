package com.icounseling.web.rest;

import com.icounseling.ICounselingApp;
import com.icounseling.domain.Reseume;
import com.icounseling.repository.ReseumeRepository;
import com.icounseling.service.ReseumeService;
import com.icounseling.service.dto.ReseumeDTO;
import com.icounseling.service.mapper.ReseumeMapper;
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
 * Integration tests for the {@Link ReseumeResource} REST controller.
 */
@SpringBootTest(classes = ICounselingApp.class)
public class ReseumeResourceIT {

    @Autowired
    private ReseumeRepository reseumeRepository;

    @Autowired
    private ReseumeMapper reseumeMapper;

    @Autowired
    private ReseumeService reseumeService;

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

    private MockMvc restReseumeMockMvc;

    private Reseume reseume;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReseumeResource reseumeResource = new ReseumeResource(reseumeService);
        this.restReseumeMockMvc = MockMvcBuilders.standaloneSetup(reseumeResource)
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
    public static Reseume createEntity(EntityManager em) {
        Reseume reseume = new Reseume();
        return reseume;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Reseume createUpdatedEntity(EntityManager em) {
        Reseume reseume = new Reseume();
        return reseume;
    }

    @BeforeEach
    public void initTest() {
        reseume = createEntity(em);
    }

    @Test
    @Transactional
    public void createReseume() throws Exception {
        int databaseSizeBeforeCreate = reseumeRepository.findAll().size();

        // Create the Reseume
        ReseumeDTO reseumeDTO = reseumeMapper.toDto(reseume);
        restReseumeMockMvc.perform(post("/api/reseumes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reseumeDTO)))
            .andExpect(status().isCreated());

        // Validate the Reseume in the database
        List<Reseume> reseumeList = reseumeRepository.findAll();
        assertThat(reseumeList).hasSize(databaseSizeBeforeCreate + 1);
        Reseume testReseume = reseumeList.get(reseumeList.size() - 1);
    }

    @Test
    @Transactional
    public void createReseumeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = reseumeRepository.findAll().size();

        // Create the Reseume with an existing ID
        reseume.setId(1L);
        ReseumeDTO reseumeDTO = reseumeMapper.toDto(reseume);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReseumeMockMvc.perform(post("/api/reseumes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reseumeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Reseume in the database
        List<Reseume> reseumeList = reseumeRepository.findAll();
        assertThat(reseumeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllReseumes() throws Exception {
        // Initialize the database
        reseumeRepository.saveAndFlush(reseume);

        // Get all the reseumeList
        restReseumeMockMvc.perform(get("/api/reseumes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reseume.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getReseume() throws Exception {
        // Initialize the database
        reseumeRepository.saveAndFlush(reseume);

        // Get the reseume
        restReseumeMockMvc.perform(get("/api/reseumes/{id}", reseume.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(reseume.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingReseume() throws Exception {
        // Get the reseume
        restReseumeMockMvc.perform(get("/api/reseumes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReseume() throws Exception {
        // Initialize the database
        reseumeRepository.saveAndFlush(reseume);

        int databaseSizeBeforeUpdate = reseumeRepository.findAll().size();

        // Update the reseume
        Reseume updatedReseume = reseumeRepository.findById(reseume.getId()).get();
        // Disconnect from session so that the updates on updatedReseume are not directly saved in db
        em.detach(updatedReseume);
        ReseumeDTO reseumeDTO = reseumeMapper.toDto(updatedReseume);

        restReseumeMockMvc.perform(put("/api/reseumes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reseumeDTO)))
            .andExpect(status().isOk());

        // Validate the Reseume in the database
        List<Reseume> reseumeList = reseumeRepository.findAll();
        assertThat(reseumeList).hasSize(databaseSizeBeforeUpdate);
        Reseume testReseume = reseumeList.get(reseumeList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingReseume() throws Exception {
        int databaseSizeBeforeUpdate = reseumeRepository.findAll().size();

        // Create the Reseume
        ReseumeDTO reseumeDTO = reseumeMapper.toDto(reseume);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReseumeMockMvc.perform(put("/api/reseumes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reseumeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Reseume in the database
        List<Reseume> reseumeList = reseumeRepository.findAll();
        assertThat(reseumeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteReseume() throws Exception {
        // Initialize the database
        reseumeRepository.saveAndFlush(reseume);

        int databaseSizeBeforeDelete = reseumeRepository.findAll().size();

        // Delete the reseume
        restReseumeMockMvc.perform(delete("/api/reseumes/{id}", reseume.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Reseume> reseumeList = reseumeRepository.findAll();
        assertThat(reseumeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Reseume.class);
        Reseume reseume1 = new Reseume();
        reseume1.setId(1L);
        Reseume reseume2 = new Reseume();
        reseume2.setId(reseume1.getId());
        assertThat(reseume1).isEqualTo(reseume2);
        reseume2.setId(2L);
        assertThat(reseume1).isNotEqualTo(reseume2);
        reseume1.setId(null);
        assertThat(reseume1).isNotEqualTo(reseume2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReseumeDTO.class);
        ReseumeDTO reseumeDTO1 = new ReseumeDTO();
        reseumeDTO1.setId(1L);
        ReseumeDTO reseumeDTO2 = new ReseumeDTO();
        assertThat(reseumeDTO1).isNotEqualTo(reseumeDTO2);
        reseumeDTO2.setId(reseumeDTO1.getId());
        assertThat(reseumeDTO1).isEqualTo(reseumeDTO2);
        reseumeDTO2.setId(2L);
        assertThat(reseumeDTO1).isNotEqualTo(reseumeDTO2);
        reseumeDTO1.setId(null);
        assertThat(reseumeDTO1).isNotEqualTo(reseumeDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(reseumeMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(reseumeMapper.fromId(null)).isNull();
    }
}
