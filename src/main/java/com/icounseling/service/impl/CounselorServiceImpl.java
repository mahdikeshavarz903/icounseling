package com.icounseling.service.impl;

import com.icounseling.service.CounselorService;
import com.icounseling.domain.Counselor;
import com.icounseling.repository.CounselorRepository;
import com.icounseling.service.dto.CounselorDTO;
import com.icounseling.service.mapper.CounselorMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Counselor}.
 */
@Service
@Transactional
public class CounselorServiceImpl implements CounselorService {

    private final Logger log = LoggerFactory.getLogger(CounselorServiceImpl.class);

    private final CounselorRepository counselorRepository;

    private final CounselorMapper counselorMapper;

    public CounselorServiceImpl(CounselorRepository counselorRepository, CounselorMapper counselorMapper) {
        this.counselorRepository = counselorRepository;
        this.counselorMapper = counselorMapper;
    }

    /**
     * Save a counselor.
     *
     * @param counselorDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public CounselorDTO save(CounselorDTO counselorDTO) {
        log.debug("Request to save Counselor : {}", counselorDTO);
        Counselor counselor = counselorMapper.toEntity(counselorDTO);
        counselor = counselorRepository.save(counselor);
        return counselorMapper.toDto(counselor);
    }

    /**
     * Get all the counselors.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<CounselorDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Counselors");
        return counselorRepository.findAll(pageable)
            .map(counselorMapper::toDto);
    }


    /**
     * Get one counselor by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CounselorDTO> findOne(Long id) {
        log.debug("Request to get Counselor : {}", id);
        return counselorRepository.findById(id)
            .map(counselorMapper::toDto);
    }

    /**
     * Delete the counselor by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Counselor : {}", id);
        counselorRepository.deleteById(id);
    }
}
