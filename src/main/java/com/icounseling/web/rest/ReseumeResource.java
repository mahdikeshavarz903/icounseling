package com.icounseling.web.rest;

import com.icounseling.service.ReseumeService;
import com.icounseling.web.rest.errors.BadRequestAlertException;
import com.icounseling.service.dto.ReseumeDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.icounseling.domain.Reseume}.
 */
@RestController
@RequestMapping("/api")
public class ReseumeResource {

    private final Logger log = LoggerFactory.getLogger(ReseumeResource.class);

    private static final String ENTITY_NAME = "reseume";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ReseumeService reseumeService;

    public ReseumeResource(ReseumeService reseumeService) {
        this.reseumeService = reseumeService;
    }

    /**
     * {@code POST  /reseumes} : Create a new reseume.
     *
     * @param reseumeDTO the reseumeDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new reseumeDTO, or with status {@code 400 (Bad Request)} if the reseume has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/reseumes")
    public ResponseEntity<ReseumeDTO> createReseume(@RequestBody ReseumeDTO reseumeDTO) throws URISyntaxException {
        log.debug("REST request to save Reseume : {}", reseumeDTO);
        if (reseumeDTO.getId() != null) {
            throw new BadRequestAlertException("A new reseume cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReseumeDTO result = reseumeService.save(reseumeDTO);
        return ResponseEntity.created(new URI("/api/reseumes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /reseumes} : Updates an existing reseume.
     *
     * @param reseumeDTO the reseumeDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated reseumeDTO,
     * or with status {@code 400 (Bad Request)} if the reseumeDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the reseumeDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/reseumes")
    public ResponseEntity<ReseumeDTO> updateReseume(@RequestBody ReseumeDTO reseumeDTO) throws URISyntaxException {
        log.debug("REST request to update Reseume : {}", reseumeDTO);
        if (reseumeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ReseumeDTO result = reseumeService.save(reseumeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, reseumeDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /reseumes} : get all the reseumes.
     *
     * @param pageable the pagination information.
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder a {@link UriComponentsBuilder} URI builder.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of reseumes in body.
     */
    @GetMapping("/reseumes")
    public ResponseEntity<List<ReseumeDTO>> getAllReseumes(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of Reseumes");
        Page<ReseumeDTO> page = reseumeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /reseumes/:id} : get the "id" reseume.
     *
     * @param id the id of the reseumeDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the reseumeDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/reseumes/{id}")
    public ResponseEntity<ReseumeDTO> getReseume(@PathVariable Long id) {
        log.debug("REST request to get Reseume : {}", id);
        Optional<ReseumeDTO> reseumeDTO = reseumeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(reseumeDTO);
    }

    /**
     * {@code DELETE  /reseumes/:id} : delete the "id" reseume.
     *
     * @param id the id of the reseumeDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/reseumes/{id}")
    public ResponseEntity<Void> deleteReseume(@PathVariable Long id) {
        log.debug("REST request to delete Reseume : {}", id);
        reseumeService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
