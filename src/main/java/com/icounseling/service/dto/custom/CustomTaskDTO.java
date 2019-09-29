package com.icounseling.service.dto.custom;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

import com.icounseling.domain.Reminder;
import com.icounseling.domain.enumeration.RepeatTime;
import com.icounseling.domain.enumeration.RepeatUntil;
import com.icounseling.service.dto.PlanningDTO;
import com.icounseling.service.dto.ReminderDTO;
import com.icounseling.service.dto.ScheduleDTO;

/**
 * A DTO for the {@link com.icounseling.domain.Task} entity.
 */
public class CustomTaskDTO implements Serializable {

    private Long id;

    @NotNull
    private RepeatTime repeatTime;

    @NotNull
    private RepeatUntil repeatUntil;


    private ReminderDTO reminder;

    private ScheduleDTO schedule;

    private PlanningDTO planning;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public RepeatTime getRepeatTime() {
        return repeatTime;
    }

    public void setRepeatTime(RepeatTime repeatTime) {
        this.repeatTime = repeatTime;
    }

    public RepeatUntil getRepeatUntil() {
        return repeatUntil;
    }

    public void setRepeatUntil(RepeatUntil repeatUntil) {
        this.repeatUntil = repeatUntil;
    }

    public ReminderDTO getReminder() {
        return reminder;
    }

    public void setReminder(ReminderDTO reminder) {
        this.reminder = reminder;
    }

    public ScheduleDTO getSchedule() {
        return schedule;
    }

    public void setSchedule(ScheduleDTO schedule) {
        this.schedule = schedule;
    }

    public PlanningDTO getPlanning() {
        return planning;
    }

    public void setPlanning(PlanningDTO planning) {
        this.planning = planning;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CustomTaskDTO taskDTO = (CustomTaskDTO) o;
        if (taskDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), taskDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TaskDTO{" +
            "id=" + getId() +
            ", repeatTime='" + getRepeatTime() + "'" +
            ", repeatUntil='" + getRepeatUntil() + "'" +
            ", reminder=" + getReminder().getId() +
            ", schedule=" + getSchedule().getId() +
            ", planning=" + getPlanning().getId() +
            "}";
    }
}
