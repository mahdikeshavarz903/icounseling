package com.icounseling.service.impl;

import com.icounseling.service.ScheduleService;
import com.icounseling.domain.Schedule;
import com.icounseling.repository.ScheduleRepository;
import com.icounseling.service.dto.ScheduleDTO;
import com.icounseling.service.mapper.ScheduleMapper;
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
 * Service Implementation for managing {@link Schedule}.
 */
@Service
@Transactional
public class ScheduleServiceImpl implements ScheduleService {

    private final Logger log = LoggerFactory.getLogger(ScheduleServiceImpl.class);

    private final ScheduleRepository scheduleRepository;

    private final ScheduleMapper scheduleMapper;

    public ScheduleServiceImpl(ScheduleRepository scheduleRepository, ScheduleMapper scheduleMapper) {
        this.scheduleRepository = scheduleRepository;
        this.scheduleMapper = scheduleMapper;
    }

    /**
     * Save a schedule.
     *
     * @param scheduleDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ScheduleDTO save(ScheduleDTO scheduleDTO) {
        log.debug("Request to save Schedule : {}", scheduleDTO);
        Schedule schedule = scheduleMapper.toEntity(scheduleDTO);
        schedule = scheduleRepository.save(schedule);
        return scheduleMapper.toDto(schedule);
    }

    /**
     * Get all the schedules.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ScheduleDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Schedules");
        return scheduleRepository.findAll(pageable)
            .map(scheduleMapper::toDto);
    }



    /**
    *  Get all the schedules where Task is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<ScheduleDTO> findAllWhereTaskIsNull() {
        log.debug("Request to get all schedules where Task is null");
        return StreamSupport
            .stream(scheduleRepository.findAll().spliterator(), false)
            .filter(schedule -> schedule.getTask() == null)
            .map(scheduleMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
    *  Get all the schedules where Post is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<ScheduleDTO> findAllWherePostIsNull() {
        log.debug("Request to get all schedules where Post is null");
        return StreamSupport
            .stream(scheduleRepository.findAll().spliterator(), false)
            .filter(schedule -> schedule.getPost() == null)
            .map(scheduleMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
    *  Get all the schedules where Comment is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<ScheduleDTO> findAllWhereCommentIsNull() {
        log.debug("Request to get all schedules where Comment is null");
        return StreamSupport
            .stream(scheduleRepository.findAll().spliterator(), false)
            .filter(schedule -> schedule.getComment() == null)
            .map(scheduleMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one schedule by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ScheduleDTO> findOne(Long id) {
        log.debug("Request to get Schedule : {}", id);
        return scheduleRepository.findById(id)
            .map(scheduleMapper::toDto);
    }

    /**
     * Delete the schedule by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Schedule : {}", id);
        scheduleRepository.deleteById(id);
    }
}
