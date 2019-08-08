package com.icounseling.web.rest;

import com.icounseling.service.ScoreService;
import com.icounseling.web.rest.errors.BadRequestAlertException;
import com.icounseling.service.dto.ScoreDTO;

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
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link com.icounseling.domain.Score}.
 */
@RestController
@RequestMapping("/api")
public class ScoreResource {

    private final Logger log = LoggerFactory.getLogger(ScoreResource.class);

    private static final String ENTITY_NAME = "score";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ScoreService scoreService;

    public ScoreResource(ScoreService scoreService) {
        this.scoreService = scoreService;
    }

    /**
     * {@code POST  /scores} : Create a new score.
     *
     * @param scoreDTO the scoreDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new scoreDTO, or with status {@code 400 (Bad Request)} if the score has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/scores")
    public ResponseEntity<ScoreDTO> createScore(@Valid @RequestBody ScoreDTO scoreDTO) throws URISyntaxException {
        log.debug("REST request to save Score : {}", scoreDTO);
        if (scoreDTO.getId() != null) {
            throw new BadRequestAlertException("A new score cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ScoreDTO result = scoreService.save(scoreDTO);
        return ResponseEntity.created(new URI("/api/scores/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /scores} : Updates an existing score.
     *
     * @param scoreDTO the scoreDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated scoreDTO,
     * or with status {@code 400 (Bad Request)} if the scoreDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the scoreDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/scores")
    public ResponseEntity<ScoreDTO> updateScore(@Valid @RequestBody ScoreDTO scoreDTO) throws URISyntaxException {
        log.debug("REST request to update Score : {}", scoreDTO);
        if (scoreDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ScoreDTO result = scoreService.save(scoreDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, scoreDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /scores} : get all the scores.
     *

     * @param pageable the pagination information.

     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of scores in body.
     */
    @GetMapping("/scores")
    public ResponseEntity<List<ScoreDTO>> getAllScores(Pageable pageable, @RequestParam(required = false) String filter) {
        if ("counselor-is-null".equals(filter)) {
            log.debug("REST request to get all Scores where counselor is null");
            return new ResponseEntity<>(scoreService.findAllWhereCounselorIsNull(),
                    HttpStatus.OK);
        }
        if ("visitor-is-null".equals(filter)) {
            log.debug("REST request to get all Scores where visitor is null");
            return new ResponseEntity<>(scoreService.findAllWhereVisitorIsNull(),
                    HttpStatus.OK);
        }
        log.debug("REST request to get a page of Scores");
        Page<ScoreDTO> page = scoreService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /scores/:id} : get the "id" score.
     *
     * @param id the id of the scoreDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the scoreDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/scores/{id}")
    public ResponseEntity<ScoreDTO> getScore(@PathVariable Long id) {
        log.debug("REST request to get Score : {}", id);
        Optional<ScoreDTO> scoreDTO = scoreService.findOne(id);
        return ResponseUtil.wrapOrNotFound(scoreDTO);
    }

    /**
     * {@code DELETE  /scores/:id} : delete the "id" score.
     *
     * @param id the id of the scoreDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/scores/{id}")
    public ResponseEntity<Void> deleteScore(@PathVariable Long id) {
        log.debug("REST request to delete Score : {}", id);
        scoreService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
