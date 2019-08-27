package com.icounseling.service.dto;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A DTO for the {@link com.icounseling.domain.TimeReserved} entity.
 */
public class TimeReservedDTO implements Serializable {

    private Long id;

    @NotNull
    private LocalDate date;

    @NotNull
    private Instant time;

    @NotNull
    private String description;


    private Long counselorId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Instant getTime() {
        return time;
    }

    public void setTime(Instant time) {
        this.time = time;
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

        TimeReservedDTO timeReservedDTO = (TimeReservedDTO) o;
        if (timeReservedDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), timeReservedDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TimeReservedDTO{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", time='" + getTime() + "'" +
            ", description='" + getDescription() + "'" +
            ", counselor=" + getCounselorId() +
            "}";
    }
}
