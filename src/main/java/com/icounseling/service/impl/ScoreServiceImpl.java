package com.icounseling.service.impl;

import com.icounseling.service.ScoreService;
import com.icounseling.domain.Score;
import com.icounseling.repository.ScoreRepository;
import com.icounseling.service.dto.ScoreDTO;
import com.icounseling.service.mapper.ScoreMapper;
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
 * Service Implementation for managing {@link Score}.
 */
@Service
@Transactional
public class ScoreServiceImpl implements ScoreService {

    private final Logger log = LoggerFactory.getLogger(ScoreServiceImpl.class);

    private final ScoreRepository scoreRepository;

    private final ScoreMapper scoreMapper;

    public ScoreServiceImpl(ScoreRepository scoreRepository, ScoreMapper scoreMapper) {
        this.scoreRepository = scoreRepository;
        this.scoreMapper = scoreMapper;
    }

    /**
     * Save a score.
     *
     * @param scoreDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ScoreDTO save(ScoreDTO scoreDTO) {
        log.debug("Request to save Score : {}", scoreDTO);
        Score score = scoreMapper.toEntity(scoreDTO);
        score = scoreRepository.save(score);
        return scoreMapper.toDto(score);
    }

    /**
     * Get all the scores.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ScoreDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Scores");
        return scoreRepository.findAll(pageable)
            .map(scoreMapper::toDto);
    }



    /**
    *  Get all the scores where Counselor is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<ScoreDTO> findAllWhereCounselorIsNull() {
        log.debug("Request to get all scores where Counselor is null");
        return StreamSupport
            .stream(scoreRepository.findAll().spliterator(), false)
            .filter(score -> score.getCounselor() == null)
            .map(scoreMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
    *  Get all the scores where Visitor is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<ScoreDTO> findAllWhereVisitorIsNull() {
        log.debug("Request to get all scores where Visitor is null");
        return StreamSupport
            .stream(scoreRepository.findAll().spliterator(), false)
            .filter(score -> score.getVisitor() == null)
            .map(scoreMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one score by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ScoreDTO> findOne(Long id) {
        log.debug("Request to get Score : {}", id);
        return scoreRepository.findById(id)
            .map(scoreMapper::toDto);
    }

    /**
     * Delete the score by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Score : {}", id);
        scoreRepository.deleteById(id);
    }
}
