package com.icounseling.service.impl;

import com.icounseling.service.ReseumeService;
import com.icounseling.domain.Reseume;
import com.icounseling.repository.ReseumeRepository;
import com.icounseling.service.dto.ReseumeDTO;
import com.icounseling.service.mapper.ReseumeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Reseume}.
 */
@Service
@Transactional
public class ReseumeServiceImpl implements ReseumeService {

    private final Logger log = LoggerFactory.getLogger(ReseumeServiceImpl.class);

    private final ReseumeRepository reseumeRepository;

    private final ReseumeMapper reseumeMapper;

    public ReseumeServiceImpl(ReseumeRepository reseumeRepository, ReseumeMapper reseumeMapper) {
        this.reseumeRepository = reseumeRepository;
        this.reseumeMapper = reseumeMapper;
    }

    /**
     * Save a reseume.
     *
     * @param reseumeDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ReseumeDTO save(ReseumeDTO reseumeDTO) {
        log.debug("Request to save Reseume : {}", reseumeDTO);
        Reseume reseume = reseumeMapper.toEntity(reseumeDTO);
        reseume = reseumeRepository.save(reseume);
        return reseumeMapper.toDto(reseume);
    }

    /**
     * Get all the reseumes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ReseumeDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Reseumes");
        return reseumeRepository.findAll(pageable)
            .map(reseumeMapper::toDto);
    }


    /**
     * Get one reseume by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ReseumeDTO> findOne(Long id) {
        log.debug("Request to get Reseume : {}", id);
        return reseumeRepository.findById(id)
            .map(reseumeMapper::toDto);
    }

    /**
     * Delete the reseume by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Reseume : {}", id);
        reseumeRepository.deleteById(id);
    }
}
