package com.icounseling.service.impl;

import com.icounseling.service.CounselingCaseService;
import com.icounseling.domain.CounselingCase;
import com.icounseling.repository.CounselingCaseRepository;
import com.icounseling.service.dto.CounselingCaseDTO;
import com.icounseling.service.mapper.CounselingCaseMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link CounselingCase}.
 */
@Service
@Transactional
public class CounselingCaseServiceImpl implements CounselingCaseService {

    private final Logger log = LoggerFactory.getLogger(CounselingCaseServiceImpl.class);

    private final CounselingCaseRepository counselingCaseRepository;

    private final CounselingCaseMapper counselingCaseMapper;

    public CounselingCaseServiceImpl(CounselingCaseRepository counselingCaseRepository, CounselingCaseMapper counselingCaseMapper) {
        this.counselingCaseRepository = counselingCaseRepository;
        this.counselingCaseMapper = counselingCaseMapper;
    }

    /**
     * Save a counselingCase.
     *
     * @param counselingCaseDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public CounselingCaseDTO save(CounselingCaseDTO counselingCaseDTO) {
        log.debug("Request to save CounselingCase : {}", counselingCaseDTO);
        CounselingCase counselingCase = counselingCaseMapper.toEntity(counselingCaseDTO);
        counselingCase = counselingCaseRepository.save(counselingCase);
        return counselingCaseMapper.toDto(counselingCase);
    }

    /**
     * Get all the counselingCases.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<CounselingCaseDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CounselingCases");
        return counselingCaseRepository.findAll(pageable)
            .map(counselingCaseMapper::toDto);
    }


    /**
     * Get one counselingCase by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CounselingCaseDTO> findOne(Long id) {
        log.debug("Request to get CounselingCase : {}", id);
        return counselingCaseRepository.findById(id)
            .map(counselingCaseMapper::toDto);
    }

    /**
     * Delete the counselingCase by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CounselingCase : {}", id);
        counselingCaseRepository.deleteById(id);
    }
}
