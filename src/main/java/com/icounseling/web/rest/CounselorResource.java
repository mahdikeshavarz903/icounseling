package com.icounseling.web.rest;

import com.icounseling.security.AuthoritiesConstants;
import com.icounseling.service.CounselorService;
import com.icounseling.service.dto.CounselorDTO;
import com.icounseling.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.icounseling.domain.Counselor}.
 */
@RestController
@RequestMapping("/api")
public class CounselorResource {

    private final Logger log = LoggerFactory.getLogger(CounselorResource.class);

    private static final String ENTITY_NAME = "counselor";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CounselorService counselorService;

    public CounselorResource(CounselorService counselorService) {
        this.counselorService = counselorService;
    }

    /**
     * {@code POST  /counselors} : Create a new counselor.
     *
     * @param counselorDTO the counselorDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new counselorDTO, or with status {@code 400 (Bad Request)} if the counselor has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/counselors")
    public ResponseEntity<CounselorDTO> createCounselor(@Valid @RequestBody CounselorDTO counselorDTO) throws URISyntaxException {
        log.debug("REST request to save Counselor : {}", counselorDTO);
        if (counselorDTO.getId() != null) {
            throw new BadRequestAlertException("A new counselor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CounselorDTO result = counselorService.save(counselorDTO);
        return ResponseEntity.created(new URI("/api/counselors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /counselors} : Updates an existing counselor.
     *
     * @param counselorDTO the counselorDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated counselorDTO,
     * or with status {@code 400 (Bad Request)} if the counselorDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the counselorDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/counselors")
    public ResponseEntity<CounselorDTO> updateCounselor(@Valid @RequestBody CounselorDTO counselorDTO) throws URISyntaxException {
        log.debug("REST request to update Counselor : {}", counselorDTO);
        if (counselorDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CounselorDTO result = counselorService.save(counselorDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, counselorDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /counselors} : get all the counselors.
     *
     * @param pageable the pagination information.
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder a {@link UriComponentsBuilder} URI builder.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of counselors in body.
     */
    @GetMapping("/counselors")
    public ResponseEntity<List<CounselorDTO>> getAllCounselors(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of Counselors");
        Page<CounselorDTO> page = counselorService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /counselors/:id} : get the "id" counselor.
     *
     * @param id the id of the counselorDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the counselorDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/counselors/{id}")
    public ResponseEntity<CounselorDTO> getCounselor(@PathVariable Long id) {
        log.debug("REST request to get Counselor : {}", id);
        Optional<CounselorDTO> counselorDTO = counselorService.findOne(id);
        return ResponseUtil.wrapOrNotFound(counselorDTO);
    }

    /**
     * {@code DELETE  /counselors/:id} : delete the "id" counselor.
     *
     * @param id the id of the counselorDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/counselors/{id}")
    public ResponseEntity<Void> deleteCounselor(@PathVariable Long id) {
        log.debug("REST request to delete Counselor : {}", id);
        counselorService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code GET  /counselors/{id}/counseling-case} : Get all cases for one counselor.
     *
     * @param pageable    the pagination information.
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder  a {@link UriComponentsBuilder} URI builder.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of Object in body.
     */
    @GetMapping("/counselors/{id}/counseling-case")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.COUNSELOR + "\")")
    public ResponseEntity<List<Object>> getAllCasesForOneCounselor(Pageable pageable, @PathVariable Long id, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of all cases for one Counselors");
        Page<Object> page = counselorService.findAllCasesForOneCounselor(id, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/counselors/visitors/{id}")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.COUNSELOR + "\")")
    public ResponseEntity<Object> getAllVisitorInformation(@PathVariable Long id) {
        log.debug("REST request to get all information for one visitor");
        Optional<Object> visitor = counselorService.findAllVisitorInformation(id);
        return ResponseUtil.wrapOrNotFound(visitor);
    }
}
