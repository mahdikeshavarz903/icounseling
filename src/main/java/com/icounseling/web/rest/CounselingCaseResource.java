package com.icounseling.web.rest;

import com.icounseling.service.CounselingCaseService;
import com.icounseling.service.dto.CounselingCaseDTO;
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
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.icounseling.domain.CounselingCase}.
 */
@RestController
@RequestMapping("/api")
public class CounselingCaseResource {

    private final Logger log = LoggerFactory.getLogger(CounselingCaseResource.class);

    private static final String ENTITY_NAME = "counselingCase";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CounselingCaseService counselingCaseService;

    public CounselingCaseResource(CounselingCaseService counselingCaseService) {
        this.counselingCaseService = counselingCaseService;
    }

    /**
     * {@code POST  /counseling-cases} : Create a new counselingCase.
     *
     * @param counselingCaseDTO the counselingCaseDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new counselingCaseDTO, or with status {@code 400 (Bad Request)} if the counselingCase has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/counseling-cases")
    public ResponseEntity<CounselingCaseDTO> createCounselingCase(@Valid @RequestBody CounselingCaseDTO counselingCaseDTO) throws URISyntaxException {
        log.debug("REST request to save CounselingCase : {}", counselingCaseDTO);
        if (counselingCaseDTO.getId() != null) {
            throw new BadRequestAlertException("A new counselingCase cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CounselingCaseDTO result = counselingCaseService.save(counselingCaseDTO);
        return ResponseEntity.created(new URI("/api/counseling-cases/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /counseling-cases} : Updates an existing counselingCase.
     *
     * @param counselingCaseDTO the counselingCaseDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated counselingCaseDTO,
     * or with status {@code 400 (Bad Request)} if the counselingCaseDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the counselingCaseDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/counseling-cases")
    public ResponseEntity<CounselingCaseDTO> updateCounselingCase(@Valid @RequestBody CounselingCaseDTO counselingCaseDTO) throws URISyntaxException {
        log.debug("REST request to update CounselingCase : {}", counselingCaseDTO);
        if (counselingCaseDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CounselingCaseDTO result = counselingCaseService.save(counselingCaseDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, counselingCaseDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /counseling-cases} : get all the counselingCases.
     *
     * @param pageable the pagination information.
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder a {@link UriComponentsBuilder} URI builder.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of counselingCases in body.
     */
    @GetMapping("/counseling-cases")
    public ResponseEntity<List<CounselingCaseDTO>> getAllCounselingCases(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of CounselingCases");
        Page<CounselingCaseDTO> page = counselingCaseService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /counseling-cases/:id} : get the "id" counselingCase.
     *
     * @param id the id of the counselingCaseDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the counselingCaseDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/counseling-cases/{id}")
    public ResponseEntity<CounselingCaseDTO> getCounselingCase(@PathVariable Long id) {
        log.debug("REST request to get CounselingCase : {}", id);
        Optional<CounselingCaseDTO> counselingCaseDTO = counselingCaseService.findOne(id);
        return ResponseUtil.wrapOrNotFound(counselingCaseDTO);
    }

    /**
     * {@code DELETE  /counseling-cases/:id} : delete the "id" counselingCase.
     *
     * @param id the id of the counselingCaseDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/counseling-cases/{id}")
    public ResponseEntity<Void> deleteCounselingCase(@PathVariable Long id) {
        log.debug("REST request to delete CounselingCase : {}", id);
        counselingCaseService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
