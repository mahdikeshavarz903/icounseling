package com.icounseling.service.mapper.custom;

import com.icounseling.domain.*;
import com.icounseling.service.dto.TaskDTO;

import com.icounseling.service.dto.custom.CustomTaskDTO;
import com.icounseling.service.mapper.EntityMapper;
import com.icounseling.service.mapper.PlanningMapper;
import com.icounseling.service.mapper.ReminderMapper;
import com.icounseling.service.mapper.ScheduleMapper;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Task} and its DTO {@link CustomTaskDTO}.
 */
@Mapper(componentModel = "spring", uses = {ReminderMapper.class, ScheduleMapper.class, PlanningMapper.class})
public interface CustomTaskMapper extends EntityMapper<CustomTaskDTO, Task> {

    @Mapping(source = "reminder", target = "reminder")
    @Mapping(source = "schedule", target = "schedule")
    @Mapping(source = "planning", target = "planning")
    CustomTaskDTO toDto(Task task);

    @Mapping(source = "reminderId", target = "reminder")
    @Mapping(source = "scheduleId", target = "schedule")
    @Mapping(source = "planningId", target = "planning")
    Task toEntity(TaskDTO taskDTO);

    default Task fromId(Long id) {
        if (id == null) {
            return null;
        }
        Task task = new Task();
        task.setId(id);
        return task;
    }
}
