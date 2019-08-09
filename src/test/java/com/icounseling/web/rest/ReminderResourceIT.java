package com.icounseling.web.rest;

import com.icounseling.ICounselingApp;
import com.icounseling.domain.Reminder;
import com.icounseling.repository.ReminderRepository;
import com.icounseling.service.ReminderService;
import com.icounseling.service.dto.ReminderDTO;
import com.icounseling.service.mapper.ReminderMapper;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.icounseling.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ReminderResource} REST controller.
 */
@SpringBootTest(classes = ICounselingApp.class)
public class ReminderResourceIT {

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_DATE = LocalDate.ofEpochDay(-1L);

    private static final LocalDate DEFAULT_TIME = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_TIME = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_TIME = LocalDate.ofEpochDay(-1L);

    @Autowired
    private ReminderRepository reminderRepository;

    @Autowired
    private ReminderMapper reminderMapper;

    @Autowired
    private ReminderService reminderService;

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

    private MockMvc restReminderMockMvc;

    private Reminder reminder;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReminderResource reminderResource = new ReminderResource(reminderService);
        this.restReminderMockMvc = MockMvcBuilders.standaloneSetup(reminderResource)
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
    public static Reminder createEntity(EntityManager em) {
        Reminder reminder = new Reminder()
            .date(DEFAULT_DATE)
            .time(DEFAULT_TIME);
        return reminder;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Reminder createUpdatedEntity(EntityManager em) {
        Reminder reminder = new Reminder()
            .date(UPDATED_DATE)
            .time(UPDATED_TIME);
        return reminder;
    }

    @BeforeEach
    public void initTest() {
        reminder = createEntity(em);
    }

    @Test
    @Transactional
    public void createReminder() throws Exception {
        int databaseSizeBeforeCreate = reminderRepository.findAll().size();

        // Create the Reminder
        ReminderDTO reminderDTO = reminderMapper.toDto(reminder);
        restReminderMockMvc.perform(post("/api/reminders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reminderDTO)))
            .andExpect(status().isCreated());

        // Validate the Reminder in the database
        List<Reminder> reminderList = reminderRepository.findAll();
        assertThat(reminderList).hasSize(databaseSizeBeforeCreate + 1);
        Reminder testReminder = reminderList.get(reminderList.size() - 1);
        assertThat(testReminder.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testReminder.getTime()).isEqualTo(DEFAULT_TIME);
    }

    @Test
    @Transactional
    public void createReminderWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = reminderRepository.findAll().size();

        // Create the Reminder with an existing ID
        reminder.setId(1L);
        ReminderDTO reminderDTO = reminderMapper.toDto(reminder);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReminderMockMvc.perform(post("/api/reminders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reminderDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Reminder in the database
        List<Reminder> reminderList = reminderRepository.findAll();
        assertThat(reminderList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = reminderRepository.findAll().size();
        // set the field null
        reminder.setDate(null);

        // Create the Reminder, which fails.
        ReminderDTO reminderDTO = reminderMapper.toDto(reminder);

        restReminderMockMvc.perform(post("/api/reminders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reminderDTO)))
            .andExpect(status().isBadRequest());

        List<Reminder> reminderList = reminderRepository.findAll();
        assertThat(reminderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = reminderRepository.findAll().size();
        // set the field null
        reminder.setTime(null);

        // Create the Reminder, which fails.
        ReminderDTO reminderDTO = reminderMapper.toDto(reminder);

        restReminderMockMvc.perform(post("/api/reminders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reminderDTO)))
            .andExpect(status().isBadRequest());

        List<Reminder> reminderList = reminderRepository.findAll();
        assertThat(reminderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllReminders() throws Exception {
        // Initialize the database
        reminderRepository.saveAndFlush(reminder);

        // Get all the reminderList
        restReminderMockMvc.perform(get("/api/reminders?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reminder.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].time").value(hasItem(DEFAULT_TIME.toString())));
    }
    
    @Test
    @Transactional
    public void getReminder() throws Exception {
        // Initialize the database
        reminderRepository.saveAndFlush(reminder);

        // Get the reminder
        restReminderMockMvc.perform(get("/api/reminders/{id}", reminder.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(reminder.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.time").value(DEFAULT_TIME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingReminder() throws Exception {
        // Get the reminder
        restReminderMockMvc.perform(get("/api/reminders/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReminder() throws Exception {
        // Initialize the database
        reminderRepository.saveAndFlush(reminder);

        int databaseSizeBeforeUpdate = reminderRepository.findAll().size();

        // Update the reminder
        Reminder updatedReminder = reminderRepository.findById(reminder.getId()).get();
        // Disconnect from session so that the updates on updatedReminder are not directly saved in db
        em.detach(updatedReminder);
        updatedReminder
            .date(UPDATED_DATE)
            .time(UPDATED_TIME);
        ReminderDTO reminderDTO = reminderMapper.toDto(updatedReminder);

        restReminderMockMvc.perform(put("/api/reminders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reminderDTO)))
            .andExpect(status().isOk());

        // Validate the Reminder in the database
        List<Reminder> reminderList = reminderRepository.findAll();
        assertThat(reminderList).hasSize(databaseSizeBeforeUpdate);
        Reminder testReminder = reminderList.get(reminderList.size() - 1);
        assertThat(testReminder.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testReminder.getTime()).isEqualTo(UPDATED_TIME);
    }

    @Test
    @Transactional
    public void updateNonExistingReminder() throws Exception {
        int databaseSizeBeforeUpdate = reminderRepository.findAll().size();

        // Create the Reminder
        ReminderDTO reminderDTO = reminderMapper.toDto(reminder);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReminderMockMvc.perform(put("/api/reminders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reminderDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Reminder in the database
        List<Reminder> reminderList = reminderRepository.findAll();
        assertThat(reminderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteReminder() throws Exception {
        // Initialize the database
        reminderRepository.saveAndFlush(reminder);

        int databaseSizeBeforeDelete = reminderRepository.findAll().size();

        // Delete the reminder
        restReminderMockMvc.perform(delete("/api/reminders/{id}", reminder.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Reminder> reminderList = reminderRepository.findAll();
        assertThat(reminderList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Reminder.class);
        Reminder reminder1 = new Reminder();
        reminder1.setId(1L);
        Reminder reminder2 = new Reminder();
        reminder2.setId(reminder1.getId());
        assertThat(reminder1).isEqualTo(reminder2);
        reminder2.setId(2L);
        assertThat(reminder1).isNotEqualTo(reminder2);
        reminder1.setId(null);
        assertThat(reminder1).isNotEqualTo(reminder2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReminderDTO.class);
        ReminderDTO reminderDTO1 = new ReminderDTO();
        reminderDTO1.setId(1L);
        ReminderDTO reminderDTO2 = new ReminderDTO();
        assertThat(reminderDTO1).isNotEqualTo(reminderDTO2);
        reminderDTO2.setId(reminderDTO1.getId());
        assertThat(reminderDTO1).isEqualTo(reminderDTO2);
        reminderDTO2.setId(2L);
        assertThat(reminderDTO1).isNotEqualTo(reminderDTO2);
        reminderDTO1.setId(null);
        assertThat(reminderDTO1).isNotEqualTo(reminderDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(reminderMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(reminderMapper.fromId(null)).isNull();
    }
}
