package com.icounseling.service.impl;

import com.icounseling.service.PlanningService;
import com.icounseling.domain.Planning;
import com.icounseling.repository.PlanningRepository;
import com.icounseling.service.dto.PlanningDTO;
import com.icounseling.service.mapper.PlanningMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Planning}.
 */
@Service
@Transactional
public class PlanningServiceImpl implements PlanningService {

    private final Logger log = LoggerFactory.getLogger(PlanningServiceImpl.class);

    private final PlanningRepository planningRepository;

    private final PlanningMapper planningMapper;

    public PlanningServiceImpl(PlanningRepository planningRepository, PlanningMapper planningMapper) {
        this.planningRepository = planningRepository;
        this.planningMapper = planningMapper;
    }

    /**
     * Save a planning.
     *
     * @param planningDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public PlanningDTO save(PlanningDTO planningDTO) {
        log.debug("Request to save Planning : {}", planningDTO);
        Planning planning = planningMapper.toEntity(planningDTO);
        planning = planningRepository.save(planning);
        return planningMapper.toDto(planning);
    }

    /**
     * Get all the plannings.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PlanningDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Plannings");
        return planningRepository.findAll(pageable)
            .map(planningMapper::toDto);
    }


    /**
     * Get one planning by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PlanningDTO> findOne(Long id) {
        log.debug("Request to get Planning : {}", id);
        return planningRepository.findById(id)
            .map(planningMapper::toDto);
    }

    /**
     * Delete the planning by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Planning : {}", id);
        planningRepository.deleteById(id);
    }
}
