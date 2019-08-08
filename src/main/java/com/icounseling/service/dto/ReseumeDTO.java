package com.icounseling.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.icounseling.domain.Reseume} entity.
 */
public class ReseumeDTO implements Serializable {

    private Long id;


    private Long educationId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

        ReseumeDTO reseumeDTO = (ReseumeDTO) o;
        if (reseumeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), reseumeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ReseumeDTO{" +
            "id=" + getId() +
            ", education=" + getEducationId() +
            "}";
    }
}
