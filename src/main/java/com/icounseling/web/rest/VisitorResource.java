package com.icounseling.web.rest;

import com.icounseling.service.VisitorService;
import com.icounseling.service.dto.VisitorDTO;
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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.icounseling.domain.Visitor}.
 */
@RestController
@RequestMapping("/api")
public class VisitorResource {

    private final Logger log = LoggerFactory.getLogger(VisitorResource.class);

    private static final String ENTITY_NAME = "visitor";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VisitorService visitorService;

    public VisitorResource(VisitorService visitorService) {
        this.visitorService = visitorService;
    }

    /**
     * {@code POST  /visitors} : Create a new visitor.
     *
     * @param visitorDTO the visitorDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new visitorDTO, or with status {@code 400 (Bad Request)} if the visitor has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/visitors")
    public ResponseEntity<VisitorDTO> createVisitor(@RequestBody VisitorDTO visitorDTO) throws URISyntaxException {
        log.debug("REST request to save Visitor : {}", visitorDTO);
        if (visitorDTO.getId() != null) {
            throw new BadRequestAlertException("A new visitor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VisitorDTO result = visitorService.save(visitorDTO);
        return ResponseEntity.created(new URI("/api/visitors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /visitors} : Updates an existing visitor.
     *
     * @param visitorDTO the visitorDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated visitorDTO,
     * or with status {@code 400 (Bad Request)} if the visitorDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the visitorDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/visitors")
    public ResponseEntity<VisitorDTO> updateVisitor(@RequestBody VisitorDTO visitorDTO) throws URISyntaxException {
        log.debug("REST request to update Visitor : {}", visitorDTO);
        if (visitorDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        VisitorDTO result = visitorService.save(visitorDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, visitorDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /visitors} : get all the visitors.
     *

     * @param pageable the pagination information.

     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of visitors in body.
     */
    @GetMapping("/visitors")
    public ResponseEntity<List<VisitorDTO>> getAllVisitors(Pageable pageable, @RequestParam(required = false) String filter) {
        if ("counselingcase-is-null".equals(filter)) {
            log.debug("REST request to get all Visitors where counselingCase is null");
            return new ResponseEntity<>(visitorService.findAllWhereCounselingCaseIsNull(),
                    HttpStatus.OK);
        }
        if ("library-is-null".equals(filter)) {
            log.debug("REST request to get all Visitors where library is null");
            return new ResponseEntity<>(visitorService.findAllWhereLibraryIsNull(),
                    HttpStatus.OK);
        }
        log.debug("REST request to get a page of Visitors");
        Page<VisitorDTO> page = visitorService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /visitors/:id} : get the "id" visitor.
     *
     * @param id the id of the visitorDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the visitorDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/visitors/{id}")
    public ResponseEntity<VisitorDTO> getVisitor(@PathVariable Long id) {
        log.debug("REST request to get Visitor : {}", id);
        Optional<VisitorDTO> visitorDTO = visitorService.findOne(id);
        return ResponseUtil.wrapOrNotFound(visitorDTO);
    }

    /**
     * {@code DELETE  /visitors/:id} : delete the "id" visitor.
     *
     * @param id the id of the visitorDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/visitors/{id}")
    public ResponseEntity<Void> deleteVisitor(@PathVariable Long id) {
        log.debug("REST request to delete Visitor : {}", id);
        visitorService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
