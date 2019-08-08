package com.icounseling.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import com.icounseling.domain.enumeration.CounselingCaseStatus;

/**
 * A DTO for the {@link com.icounseling.domain.CounselingCase} entity.
 */
public class CounselingCaseDTO implements Serializable {

    private Long id;

    @NotNull
    private CounselingCaseStatus status;


    private Long visitorId;

    private Long counselorId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CounselingCaseStatus getStatus() {
        return status;
    }

    public void setStatus(CounselingCaseStatus status) {
        this.status = status;
    }

    public Long getVisitorId() {
        return visitorId;
    }

    public void setVisitorId(Long visitorId) {
        this.visitorId = visitorId;
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

        CounselingCaseDTO counselingCaseDTO = (CounselingCaseDTO) o;
        if (counselingCaseDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), counselingCaseDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CounselingCaseDTO{" +
            "id=" + getId() +
            ", status='" + getStatus() + "'" +
            ", visitor=" + getVisitorId() +
            ", counselor=" + getCounselorId() +
            "}";
    }
}
