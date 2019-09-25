package com.icounseling.web.rest;

import com.icounseling.domain.Counselor;
import com.icounseling.security.AuthoritiesConstants;
import com.icounseling.service.CounselorService;
import com.icounseling.service.dto.*;
import com.icounseling.web.rest.errors.BadRequestAlertException;
import com.mysql.cj.xdevapi.JsonArray;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.hibernate.jpamodelgen.xml.jaxb.Entity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
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
    public ResponseEntity<List<CounselingCaseDTO>> getAllCasesForOneCounselor(Pageable pageable, @PathVariable Long id, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of all cases for one Counselors");
        Page<CounselingCaseDTO> page = counselorService.findAllCasesForOneCounselor(id, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /counselors/visitors/{id}} : Get all information for one visitor.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the VisitorDTO object in body.
     */
    @GetMapping("/counselors/visitors/{id}")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.COUNSELOR + "\")")
    public ResponseEntity<Optional<VisitorDTO>> getAllVisitorInformation(@PathVariable Long id) {
        log.debug("REST request to get all information for one visitor");
        Optional<VisitorDTO> visitor = counselorService.findAllVisitorInformation(id);
        return ResponseEntity.ok().body(visitor);
    }

    /**
     * {@code GET  /counselors/visitors/{id}} : Get all information for one visitor.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the TimeReservedDTO object in body.
     */
    @GetMapping("/counselors/{id}/reserved-times")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.COUNSELOR + "\")")
    public ResponseEntity<List<TimeReservedDTO>> getAllReservedTime(Pageable pageable, @PathVariable Long id, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get all reserved time");
        Page<TimeReservedDTO> timeReservedDTOS = counselorService.findAllReservedTime(id, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), timeReservedDTOS);
        return ResponseEntity.ok().headers(headers).body(timeReservedDTOS.getContent());
    }

    /**
     * {@code GET  /counselors/{id}/all-plans} : Get all counselor plans.
     *
     * @param pageable    the pagination information.
     * @param id          the counselor id
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder  a {@link UriComponentsBuilder} URI builder.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the PlanningDTO object in body.
     */
    @GetMapping("/counselors/{id}/all-plans")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.COUNSELOR + "\")")
    public ResponseEntity<List<TaskDTO>> getAllCounselorPlanning(Pageable pageable, @PathVariable Long id, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get all counselor plans");
        Page<TaskDTO> taskDTOS = counselorService.findAllCounselorPlans(id, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), taskDTOS);
        return ResponseEntity.ok().headers(headers).body(taskDTOS.getContent());
    }

    /**
     * {@code POST  /counselors/create-plan} : Create new plan.
     *
     * @param planningDTO create counselor plan with planningDTO
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the PlanningDTO object in body.
     */
    @PostMapping("/counselors/create-plan")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.COUNSELOR + "\")")
    public ResponseEntity<PlanningDTO> createCounselorPlan(@Valid @RequestBody PlanningDTO planningDTO) throws URISyntaxException {
        log.debug("REST request to create new plan : {}", planningDTO);
        if (planningDTO.getId() != null) {
            throw new BadRequestAlertException("A new plan cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PlanningDTO pDTO = counselorService.createNewCounselorPlan(planningDTO);
        return ResponseEntity.created(new URI("/api/counselors/create-plan/" + pDTO.getId().intValue()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, "planning", pDTO.getId().toString()))
            .body(pDTO);
    }

    /**
     * {@code PUT  /counselors/create-plan} : Update counselor plan.
     *
     * @param planningDTO update counselor plan with planningDTO
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the PlanningDTO object in body.
     */
    @PutMapping("/counselors/create-plan")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.COUNSELOR + "\")")
    public ResponseEntity<PlanningDTO> updateCounselorPlan(@Valid @RequestBody PlanningDTO planningDTO) {
        log.debug("REST request to update plan");
        if (planningDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PlanningDTO pDTO = counselorService.updateCounselorPlan(planningDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, "planning", pDTO.getId().toString()))
            .body(pDTO);
    }

    /**
     * {@code DELETE  /counselors/remove-plan/{planId}} : Remove counselor plan.
     *
     * @param planId the plan id
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/counselors/remove-plan/{planId}")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.COUNSELOR + "\")")
    public ResponseEntity<Void> deleteCounselorPlan(@PathVariable Long planId) {
        log.debug("REST request to delete counselor plan with ID : {}", planId);
        counselorService.deleteCounselorPlan(planId);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, "planning", planId.toString())).build();
    }

    /**
     * {@code GET  /counselors/{id}/posts} : Get all counselor posts.
     *
     * @param pageable    the pagination information.
     * @param id          the counselor id
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder  a {@link UriComponentsBuilder} URI builder.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the PostDTO object in body.
     */
    @GetMapping("/counselors/{id}/posts")
    public ResponseEntity<List<PostDTO>> getAllPosts(Pageable pageable, @PathVariable Long id, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder){
        log.debug("REST request to get all counselor posts : {}",id);
        Page<PostDTO> postDTOS = counselorService.findCounselorPosts(pageable,id);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), postDTOS);
        return ResponseEntity.ok().headers(headers).body(postDTOS.getContent());
    }


    /**
     * {@code POST  /counselors/create-post} : Create a new post.
     *
     * @param postDTO  create new post with postDTO object
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the PostDTO object in body.
     */
    @PostMapping("/counselors/create-post")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.COUNSELOR + "\")")
    public ResponseEntity<PostDTO> createNewCounselorPost(@Valid @RequestBody PostDTO postDTO) throws URISyntaxException {
        log.debug("REST request to create a new post for counselor : {}", postDTO);
        PostDTO post = counselorService.createCounselorPost(postDTO);
        return ResponseEntity.created(new URI("/api/counselors/create-post/" + post.getId().intValue()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, "planning", post.getId().toString()))
            .body(post);
    }

    /**
     * {@code PUT  /counselors/create-post} : Update counselor post.
     *
     * @param postDTO update counselor post with postDTO
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the postDTO object in body.
     */
    @PutMapping("/counselors/create-post")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.COUNSELOR + "\")")
    public ResponseEntity<PostDTO> updateCounselorPost(@Valid @RequestBody PostDTO postDTO) throws URISyntaxException {
        log.debug("REST request to update the counselor post : {}", postDTO);
        PostDTO post = counselorService.updateCounselorPost(postDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName,true,"post",post.getId().toString()))
            .body(post);
    }

    /**
     * {@code DELETE  /counselors/remove-post/{postId}} : Remove counselor post.
     *
     * @param postId the plan id
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/counselors/remove-post/{postId}")
    public ResponseEntity<PostDTO> deleteCounselorPost(@PathVariable Long postId){
        log.debug("REST request to delete counselor post : {}", postId);
        counselorService.deleteCounselorPost(postId);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName,true,"post",postId.toString())).build();
    }

    /**
     * {@code GET  /counselors/{id}/review-counselor-information} : Get counselor information.
     *
     * @param id the counselor id
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the PostDTO object in body.
     */
    @GetMapping("/counselors/{id}/review-counselor-information")
    public ResponseEntity<Optional<CustomCounselorDTO>> reviewCounselorInformation(@PathVariable Long id, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder){
        log.debug("REST request to view all counselor information");
        Optional<CustomCounselorDTO> entities = counselorService.reviewCounselorInformation(id);
        return ResponseEntity.ok()
            .body(entities);
    }
}
