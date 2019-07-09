package com.icounseling.service.dto;
import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.icounseling.domain.Schedule} entity.
 */
public class ScheduleDTO implements Serializable {

    private Long id;

    @NotNull
    private String title;

    @NotNull
    private ZonedDateTime dateAndTime;

    @NotNull
    private String description;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public ZonedDateTime getDateAndTime() {
        return dateAndTime;
    }

    public void setDateAndTime(ZonedDateTime dateAndTime) {
        this.dateAndTime = dateAndTime;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ScheduleDTO scheduleDTO = (ScheduleDTO) o;
        if (scheduleDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), scheduleDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ScheduleDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", dateAndTime='" + getDateAndTime() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
