package com.icounseling.service.mapper;

import com.icounseling.domain.*;
import com.icounseling.service.dto.JobDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Job} and its DTO {@link JobDTO}.
 */
@Mapper(componentModel = "spring", uses = {VisitorMapper.class})
public interface JobMapper extends EntityMapper<JobDTO, Job> {

    @Mapping(source = "visitor.id", target = "visitorId")
    JobDTO toDto(Job job);

    @Mapping(source = "visitorId", target = "visitor")
    Job toEntity(JobDTO jobDTO);

    default Job fromId(Long id) {
        if (id == null) {
            return null;
        }
        Job job = new Job();
        job.setId(id);
        return job;
    }
}
