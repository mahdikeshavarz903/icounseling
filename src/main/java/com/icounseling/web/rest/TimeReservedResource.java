package com.icounseling.web.rest;

import com.icounseling.service.TimeReservedService;
import com.icounseling.service.dto.TimeReservedDTO;
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
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.icounseling.domain.TimeReserved}.
 */
@RestController
@RequestMapping("/api")
public class TimeReservedResource {

    private final Logger log = LoggerFactory.getLogger(TimeReservedResource.class);

    private static final String ENTITY_NAME = "timeReserved";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TimeReservedService timeReservedService;

    public TimeReservedResource(TimeReservedService timeReservedService) {
        this.timeReservedService = timeReservedService;
    }

    /**
     * {@code POST  /time-reserveds} : Create a new timeReserved.
     *
     * @param timeReservedDTO the timeReservedDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new timeReservedDTO, or with status {@code 400 (Bad Request)} if the timeReserved has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/time-reserveds")
    public ResponseEntity<TimeReservedDTO> createTimeReserved(@Valid @RequestBody TimeReservedDTO timeReservedDTO) throws URISyntaxException {
        log.debug("REST request to save TimeReserved : {}", timeReservedDTO);
        if (timeReservedDTO.getId() != null) {
            throw new BadRequestAlertException("A new timeReserved cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TimeReservedDTO result = timeReservedService.save(timeReservedDTO);
        return ResponseEntity.created(new URI("/api/time-reserveds/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /time-reserveds} : Updates an existing timeReserved.
     *
     * @param timeReservedDTO the timeReservedDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated timeReservedDTO,
     * or with status {@code 400 (Bad Request)} if the timeReservedDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the timeReservedDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/time-reserveds")
    public ResponseEntity<TimeReservedDTO> updateTimeReserved(@Valid @RequestBody TimeReservedDTO timeReservedDTO) throws URISyntaxException {
        log.debug("REST request to update TimeReserved : {}", timeReservedDTO);
        if (timeReservedDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TimeReservedDTO result = timeReservedService.save(timeReservedDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, timeReservedDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /time-reserveds} : get all the timeReserveds.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of timeReserveds in body.
     */
    @GetMapping("/time-reserveds")
    public ResponseEntity<List<TimeReservedDTO>> getAllTimeReserveds(Pageable pageable) {
        log.debug("REST request to get a page of TimeReserveds");
        Page<TimeReservedDTO> page = timeReservedService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /time-reserveds/:id} : get the "id" timeReserved.
     *
     * @param id the id of the timeReservedDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the timeReservedDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/time-reserveds/{id}")
    public ResponseEntity<TimeReservedDTO> getTimeReserved(@PathVariable Long id) {
        log.debug("REST request to get TimeReserved : {}", id);
        Optional<TimeReservedDTO> timeReservedDTO = timeReservedService.findOne(id);
        return ResponseUtil.wrapOrNotFound(timeReservedDTO);
    }

    /**
     * {@code DELETE  /time-reserveds/:id} : delete the "id" timeReserved.
     *
     * @param id the id of the timeReservedDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/time-reserveds/{id}")
    public ResponseEntity<Void> deleteTimeReserved(@PathVariable Long id) {
        log.debug("REST request to delete TimeReserved : {}", id);
        timeReservedService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
