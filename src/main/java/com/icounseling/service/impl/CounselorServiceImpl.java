package com.icounseling.service.impl;

import com.icounseling.domain.Counselor;
import com.icounseling.domain.Visitor;
import com.icounseling.repository.CounselingCaseRepository;
import com.icounseling.repository.CounselorRepository;
import com.icounseling.repository.TimeReservedRepository;
import com.icounseling.repository.VisitorRepository;
import com.icounseling.service.CounselorService;
import com.icounseling.service.dto.CounselingCaseDTO;
import com.icounseling.service.dto.CounselorDTO;
import com.icounseling.service.dto.TimeReservedDTO;
import com.icounseling.service.dto.VisitorDTO;
import com.icounseling.service.mapper.CounselingCaseMapper;
import com.icounseling.service.mapper.CounselorMapper;
import com.icounseling.service.mapper.TimeReservedMapper;
import com.icounseling.service.mapper.VisitorMapper;
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

    private final CounselingCaseRepository counselingCaseRepository;

    private final CounselingCaseMapper counselingCaseMapper;

    private final VisitorRepository visitorRepository;

    private final TimeReservedRepository timeReservedRepository;

    private final TimeReservedMapper timeReservedMapper;

    private final VisitorMapper visitorMapper;

    public CounselorServiceImpl(CounselorRepository counselorRepository, CounselorMapper counselorMapper, CounselingCaseRepository counselingCaseRepository, CounselingCaseMapper counselingCaseMapper, VisitorRepository visitorRepository, TimeReservedRepository timeReservedRepository, TimeReservedMapper timeReservedMapper, VisitorMapper visitorMapper) {
        this.counselorRepository = counselorRepository;
        this.counselorMapper = counselorMapper;
        this.counselingCaseRepository = counselingCaseRepository;
        this.counselingCaseMapper = counselingCaseMapper;
        this.visitorRepository = visitorRepository;
        this.timeReservedRepository = timeReservedRepository;
        this.timeReservedMapper = timeReservedMapper;
        this.visitorMapper = visitorMapper;
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
     * Get all CounselingCases for one counselor.
     *
     * @param pageable the pagination information.
     * @param id       the id of the entity.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<CounselingCaseDTO> findAllCasesForOneCounselor(Long id, Pageable pageable) {
        log.debug("Request to get all CounselingCases for one counselor");
        return counselingCaseRepository.findVisitorByCounselorId(id, pageable).map(counselingCaseMapper::toDto);
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
     * Get visitor information with ID.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<VisitorDTO> findAllVisitorInformation(Long id) {
        log.debug("Request to get visitor information with ID : {}", id);
        Optional<Visitor> visitor = visitorRepository.findUserByVisitorId(id);
        return visitor.map(visitorMapper::toDto);
    }

    /**
     * Get visitor information with ID.
     *
     * @param id       counselor id.
     * @param pageable the pagination information.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TimeReservedDTO> findAllReservedTime(Long id, Pageable pageable) {
        log.debug("Request to get all reserved time for counselor with ID : {}", id);
        Page<TimeReservedDTO> timeReservedDTO = timeReservedRepository.findTimeReservedByCounselorId(id, pageable)
            .map(timeReservedMapper::toDto);
        return timeReservedDTO;
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
