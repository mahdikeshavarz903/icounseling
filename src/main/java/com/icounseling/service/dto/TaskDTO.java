package com.icounseling.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import com.icounseling.domain.enumeration.RepeatTime;
import com.icounseling.domain.enumeration.RepeatUntil;

/**
 * A DTO for the {@link com.icounseling.domain.Task} entity.
 */
public class TaskDTO implements Serializable {

    private Long id;

    @NotNull
    private RepeatTime repeatTime;

    @NotNull
    private RepeatUntil repeatUntil;


    private Long reminderId;

    private Long scheduleId;

    private Long planningId;

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

    public Long getReminderId() {
        return reminderId;
    }

    public void setReminderId(Long reminderId) {
        this.reminderId = reminderId;
    }

    public Long getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(Long scheduleId) {
        this.scheduleId = scheduleId;
    }

    public Long getPlanningId() {
        return planningId;
    }

    public void setPlanningId(Long planningId) {
        this.planningId = planningId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TaskDTO taskDTO = (TaskDTO) o;
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
            ", reminder=" + getReminderId() +
            ", schedule=" + getScheduleId() +
            ", planning=" + getPlanningId() +
            "}";
    }
}
