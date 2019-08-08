package com.icounseling.service.impl;

import com.icounseling.service.EducationService;
import com.icounseling.domain.Education;
import com.icounseling.repository.EducationRepository;
import com.icounseling.service.dto.EducationDTO;
import com.icounseling.service.mapper.EducationMapper;
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
 * Service Implementation for managing {@link Education}.
 */
@Service
@Transactional
public class EducationServiceImpl implements EducationService {

    private final Logger log = LoggerFactory.getLogger(EducationServiceImpl.class);

    private final EducationRepository educationRepository;

    private final EducationMapper educationMapper;

    public EducationServiceImpl(EducationRepository educationRepository, EducationMapper educationMapper) {
        this.educationRepository = educationRepository;
        this.educationMapper = educationMapper;
    }

    /**
     * Save a education.
     *
     * @param educationDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public EducationDTO save(EducationDTO educationDTO) {
        log.debug("Request to save Education : {}", educationDTO);
        Education education = educationMapper.toEntity(educationDTO);
        education = educationRepository.save(education);
        return educationMapper.toDto(education);
    }

    /**
     * Get all the educations.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<EducationDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Educations");
        return educationRepository.findAll(pageable)
            .map(educationMapper::toDto);
    }



    /**
    *  Get all the educations where Counselor is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<EducationDTO> findAllWhereCounselorIsNull() {
        log.debug("Request to get all educations where Counselor is null");
        return StreamSupport
            .stream(educationRepository.findAll().spliterator(), false)
            .filter(education -> education.getCounselor() == null)
            .map(educationMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
    *  Get all the educations where Visitor is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<EducationDTO> findAllWhereVisitorIsNull() {
        log.debug("Request to get all educations where Visitor is null");
        return StreamSupport
            .stream(educationRepository.findAll().spliterator(), false)
            .filter(education -> education.getVisitor() == null)
            .map(educationMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one education by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<EducationDTO> findOne(Long id) {
        log.debug("Request to get Education : {}", id);
        return educationRepository.findById(id)
            .map(educationMapper::toDto);
    }

    /**
     * Delete the education by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Education : {}", id);
        educationRepository.deleteById(id);
    }
}
