package com.icounseling.service.mapper;

import com.icounseling.domain.*;
import com.icounseling.service.dto.JobHistoryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link JobHistory} and its DTO {@link JobHistoryDTO}.
 */
@Mapper(componentModel = "spring", uses = {JobMapper.class})
public interface JobHistoryMapper extends EntityMapper<JobHistoryDTO, JobHistory> {

    @Mapping(source = "job.id", target = "jobId")
    JobHistoryDTO toDto(JobHistory jobHistory);

    @Mapping(source = "jobId", target = "job")
    JobHistory toEntity(JobHistoryDTO jobHistoryDTO);

    default JobHistory fromId(Long id) {
        if (id == null) {
            return null;
        }
        JobHistory jobHistory = new JobHistory();
        jobHistory.setId(id);
        return jobHistory;
    }
}
