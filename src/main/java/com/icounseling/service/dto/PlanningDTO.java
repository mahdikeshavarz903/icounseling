package com.icounseling.service.dto;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A DTO for the {@link com.icounseling.domain.Planning} entity.
 */
public class PlanningDTO implements Serializable {

    private Long id;

    @NotNull
    private String title;

    @NotNull
    private LocalDate startDate;

    @NotNull
    private Instant startTime;

    @NotNull
    private LocalDate endDate;

    @NotNull
    private Instant endTime;

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

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public Instant getStartTime() {
        return startTime;
    }

    public void setStartTime(Instant startTime) {
        this.startTime = startTime;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Instant getEndTime() {
        return endTime;
    }

    public void setEndTime(Instant endTime) {
        this.endTime = endTime;
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
            ", startDate='" + getStartDate() + "'" +
            ", startTime='" + getStartTime() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", endTime='" + getEndTime() + "'" +
            ", description='" + getDescription() + "'" +
            ", counselor=" + getCounselorId() +
            "}";
    }
}
