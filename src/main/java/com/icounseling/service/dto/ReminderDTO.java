package com.icounseling.service.dto;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.icounseling.domain.Reminder} entity.
 */
public class ReminderDTO implements Serializable {

    private Long id;

    @NotNull
    private Instant dateTime;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDateTime() {
        return dateTime;
    }

    public void setDateTime(Instant dateTime) {
        this.dateTime = dateTime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ReminderDTO reminderDTO = (ReminderDTO) o;
        if (reminderDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), reminderDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ReminderDTO{" +
            "id=" + getId() +
            ", dateTime='" + getDateTime() + "'" +
            "}";
    }
}
