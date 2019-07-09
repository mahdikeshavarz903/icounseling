package com.icounseling.service.mapper;

import com.icounseling.domain.*;
import com.icounseling.service.dto.ScheduleDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Schedule} and its DTO {@link ScheduleDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ScheduleMapper extends EntityMapper<ScheduleDTO, Schedule> {


    @Mapping(target = "task", ignore = true)
    @Mapping(target = "post", ignore = true)
    @Mapping(target = "comment", ignore = true)
    Schedule toEntity(ScheduleDTO scheduleDTO);

    default Schedule fromId(Long id) {
        if (id == null) {
            return null;
        }
        Schedule schedule = new Schedule();
        schedule.setId(id);
        return schedule;
    }
}
