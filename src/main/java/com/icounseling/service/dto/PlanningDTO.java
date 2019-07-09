package com.icounseling.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.icounseling.domain.Planning} entity.
 */
public class PlanningDTO implements Serializable {

    private Long id;


    private Long counselorId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
            ", counselor=" + getCounselorId() +
            "}";
    }
}
