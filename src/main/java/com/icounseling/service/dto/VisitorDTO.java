package com.icounseling.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.icounseling.domain.Visitor} entity.
 */
public class VisitorDTO implements Serializable {

    private Long id;


    private Long scoreId;

    private Long educationId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getScoreId() {
        return scoreId;
    }

    public void setScoreId(Long scoreId) {
        this.scoreId = scoreId;
    }

    public Long getEducationId() {
        return educationId;
    }

    public void setEducationId(Long educationId) {
        this.educationId = educationId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        VisitorDTO visitorDTO = (VisitorDTO) o;
        if (visitorDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), visitorDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "VisitorDTO{" +
            "id=" + getId() +
            ", score=" + getScoreId() +
            ", education=" + getEducationId() +
            "}";
    }
}
