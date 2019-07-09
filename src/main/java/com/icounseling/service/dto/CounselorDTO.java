package com.icounseling.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import com.icounseling.domain.enumeration.ConsultantType;

/**
 * A DTO for the {@link com.icounseling.domain.Counselor} entity.
 */
public class CounselorDTO implements Serializable {

    private Long id;

    @NotNull
    private ConsultantType consultantType;


    private Long educationId;

    private Long scoreId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ConsultantType getConsultantType() {
        return consultantType;
    }

    public void setConsultantType(ConsultantType consultantType) {
        this.consultantType = consultantType;
    }

    public Long getEducationId() {
        return educationId;
    }

    public void setEducationId(Long educationId) {
        this.educationId = educationId;
    }

    public Long getScoreId() {
        return scoreId;
    }

    public void setScoreId(Long scoreId) {
        this.scoreId = scoreId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CounselorDTO counselorDTO = (CounselorDTO) o;
        if (counselorDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), counselorDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CounselorDTO{" +
            "id=" + getId() +
            ", consultantType='" + getConsultantType() + "'" +
            ", education=" + getEducationId() +
            ", score=" + getScoreId() +
            "}";
    }
}
