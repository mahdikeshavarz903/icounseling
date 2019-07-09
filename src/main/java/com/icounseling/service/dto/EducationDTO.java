package com.icounseling.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import com.icounseling.domain.enumeration.EducationDegree;

/**
 * A DTO for the {@link com.icounseling.domain.Education} entity.
 */
public class EducationDTO implements Serializable {

    private Long id;

    @NotNull
    private EducationDegree type;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EducationDegree getType() {
        return type;
    }

    public void setType(EducationDegree type) {
        this.type = type;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        EducationDTO educationDTO = (EducationDTO) o;
        if (educationDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), educationDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EducationDTO{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            "}";
    }
}
