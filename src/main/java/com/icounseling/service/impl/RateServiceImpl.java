package com.icounseling.service.impl;

import com.icounseling.service.RateService;
import com.icounseling.domain.Rate;
import com.icounseling.repository.RateRepository;
import com.icounseling.service.dto.RateDTO;
import com.icounseling.service.mapper.RateMapper;
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
 * Service Implementation for managing {@link Rate}.
 */
@Service
@Transactional
public class RateServiceImpl implements RateService {

    private final Logger log = LoggerFactory.getLogger(RateServiceImpl.class);

    private final RateRepository rateRepository;

    private final RateMapper rateMapper;

    public RateServiceImpl(RateRepository rateRepository, RateMapper rateMapper) {
        this.rateRepository = rateRepository;
        this.rateMapper = rateMapper;
    }

    /**
     * Save a rate.
     *
     * @param rateDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public RateDTO save(RateDTO rateDTO) {
        log.debug("Request to save Rate : {}", rateDTO);
        Rate rate = rateMapper.toEntity(rateDTO);
        rate = rateRepository.save(rate);
        return rateMapper.toDto(rate);
    }

    /**
     * Get all the rates.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<RateDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Rates");
        return rateRepository.findAll(pageable)
            .map(rateMapper::toDto);
    }



    /**
    *  Get all the rates where Document is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<RateDTO> findAllWhereDocumentIsNull() {
        log.debug("Request to get all rates where Document is null");
        return StreamSupport
            .stream(rateRepository.findAll().spliterator(), false)
            .filter(rate -> rate.getDocument() == null)
            .map(rateMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
    *  Get all the rates where Comment is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<RateDTO> findAllWhereCommentIsNull() {
        log.debug("Request to get all rates where Comment is null");
        return StreamSupport
            .stream(rateRepository.findAll().spliterator(), false)
            .filter(rate -> rate.getComment() == null)
            .map(rateMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one rate by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<RateDTO> findOne(Long id) {
        log.debug("Request to get Rate : {}", id);
        return rateRepository.findById(id)
            .map(rateMapper::toDto);
    }

    /**
     * Delete the rate by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Rate : {}", id);
        rateRepository.deleteById(id);
    }
}
