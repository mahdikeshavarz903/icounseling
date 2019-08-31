package com.icounseling.service.dto;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.icounseling.domain.Planning} entity.
 */
public class PlanningDTO implements Serializable {

    private Long id;

    @NotNull
    private String title;

    @NotNull
    private Instant startDateTime;

    @NotNull
    private Instant endDateTime;

    @NotNull
    private String description;


    private Long counselorId;

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

    public Instant getStartDateTime() {
        return startDateTime;
    }

    public void setStartDateTime(Instant startDateTime) {
        this.startDateTime = startDateTime;
    }

    public Instant getEndDateTime() {
        return endDateTime;
    }

    public void setEndDateTime(Instant endDateTime) {
        this.endDateTime = endDateTime;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getCounselorId() {
        return counselorId;
    }

    public void setCounselorId(Long counselorId) {
        this.counselorId = counselorId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PlanningDTO planningDTO = (PlanningDTO) o;
        if (planningDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), planningDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PlanningDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", startDateTime='" + getStartDateTime() + "'" +
            ", endDateTime='" + getEndDateTime() + "'" +
            ", description='" + getDescription() + "'" +
            ", counselor=" + getCounselorId() +
            "}";
    }
}
