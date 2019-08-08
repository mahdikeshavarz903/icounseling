package com.icounseling.service.impl;

import com.icounseling.service.TimeReservedService;
import com.icounseling.domain.TimeReserved;
import com.icounseling.repository.TimeReservedRepository;
import com.icounseling.service.dto.TimeReservedDTO;
import com.icounseling.service.mapper.TimeReservedMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link TimeReserved}.
 */
@Service
@Transactional
public class TimeReservedServiceImpl implements TimeReservedService {

    private final Logger log = LoggerFactory.getLogger(TimeReservedServiceImpl.class);

    private final TimeReservedRepository timeReservedRepository;

    private final TimeReservedMapper timeReservedMapper;

    public TimeReservedServiceImpl(TimeReservedRepository timeReservedRepository, TimeReservedMapper timeReservedMapper) {
        this.timeReservedRepository = timeReservedRepository;
        this.timeReservedMapper = timeReservedMapper;
    }

    /**
     * Save a timeReserved.
     *
     * @param timeReservedDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public TimeReservedDTO save(TimeReservedDTO timeReservedDTO) {
        log.debug("Request to save TimeReserved : {}", timeReservedDTO);
        TimeReserved timeReserved = timeReservedMapper.toEntity(timeReservedDTO);
        timeReserved = timeReservedRepository.save(timeReserved);
        return timeReservedMapper.toDto(timeReserved);
    }

    /**
     * Get all the timeReserveds.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TimeReservedDTO> findAll(Pageable pageable) {
        log.debug("Request to get all TimeReserveds");
        return timeReservedRepository.findAll(pageable)
            .map(timeReservedMapper::toDto);
    }


    /**
     * Get one timeReserved by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TimeReservedDTO> findOne(Long id) {
        log.debug("Request to get TimeReserved : {}", id);
        return timeReservedRepository.findById(id)
            .map(timeReservedMapper::toDto);
    }

    /**
     * Delete the timeReserved by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TimeReserved : {}", id);
        timeReservedRepository.deleteById(id);
    }
}
