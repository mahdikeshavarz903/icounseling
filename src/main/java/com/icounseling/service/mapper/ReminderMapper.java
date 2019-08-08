package com.icounseling.service.mapper;

import com.icounseling.domain.*;
import com.icounseling.service.dto.ReminderDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Reminder} and its DTO {@link ReminderDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ReminderMapper extends EntityMapper<ReminderDTO, Reminder> {


    @Mapping(target = "task", ignore = true)
    Reminder toEntity(ReminderDTO reminderDTO);

    default Reminder fromId(Long id) {
        if (id == null) {
            return null;
        }
        Reminder reminder = new Reminder();
        reminder.setId(id);
        return reminder;
    }
}
