package com.icounseling.service.mapper;

import com.icounseling.domain.*;
import com.icounseling.service.dto.TaskDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Task} and its DTO {@link TaskDTO}.
 */
@Mapper(componentModel = "spring", uses = {ReminderMapper.class, ScheduleMapper.class, PlanningMapper.class})
public interface TaskMapper extends EntityMapper<TaskDTO, Task> {

    @Mapping(source = "reminder.id", target = "reminderId")
    @Mapping(source = "schedule.id", target = "scheduleId")
    @Mapping(source = "planning.id", target = "planningId")
    TaskDTO toDto(Task task);

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
