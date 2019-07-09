package com.icounseling.service;

import com.icounseling.service.dto.ReminderDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.icounseling.domain.Reminder}.
 */
public interface ReminderService {

    /**
     * Save a reminder.
     *
     * @param reminderDTO the entity to save.
     * @return the persisted entity.
     */
    ReminderDTO save(ReminderDTO reminderDTO);

    /**
     * Get all the reminders.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ReminderDTO> findAll(Pageable pageable);
    /**
     * Get all the ReminderDTO where Task is {@code null}.
     *
     * @return the list of entities.
     */
    List<ReminderDTO> findAllWhereTaskIsNull();


    /**
     * Get the "id" reminder.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ReminderDTO> findOne(Long id);

    /**
     * Delete the "id" reminder.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
