package com.icounseling.service.impl;

import com.icounseling.service.ReminderService;
import com.icounseling.domain.Reminder;
import com.icounseling.repository.ReminderRepository;
import com.icounseling.service.dto.ReminderDTO;
import com.icounseling.service.mapper.ReminderMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing {@link Reminder}.
 */
@Service
@Transactional
public class ReminderServiceImpl implements ReminderService {

    private final Logger log = LoggerFactory.getLogger(ReminderServiceImpl.class);

    private final ReminderRepository reminderRepository;

    private final ReminderMapper reminderMapper;

    public ReminderServiceImpl(ReminderRepository reminderRepository, ReminderMapper reminderMapper) {
        this.reminderRepository = reminderRepository;
        this.reminderMapper = reminderMapper;
    }

    /**
     * Save a reminder.
     *
     * @param reminderDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ReminderDTO save(ReminderDTO reminderDTO) {
        log.debug("Request to save Reminder : {}", reminderDTO);
        Reminder reminder = reminderMapper.toEntity(reminderDTO);
        reminder = reminderRepository.save(reminder);
        return reminderMapper.toDto(reminder);
    }

    /**
     * Get all the reminders.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ReminderDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Reminders");
        return reminderRepository.findAll(pageable)
            .map(reminderMapper::toDto);
    }



    /**
    *  Get all the reminders where Task is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<ReminderDTO> findAllWhereTaskIsNull() {
        log.debug("Request to get all reminders where Task is null");
        return StreamSupport
            .stream(reminderRepository.findAll().spliterator(), false)
            .filter(reminder -> reminder.getTask() == null)
            .map(reminderMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one reminder by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ReminderDTO> findOne(Long id) {
        log.debug("Request to get Reminder : {}", id);
        return reminderRepository.findById(id)
            .map(reminderMapper::toDto);
    }

    /**
     * Delete the reminder by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Reminder : {}", id);
        reminderRepository.deleteById(id);
    }
}
