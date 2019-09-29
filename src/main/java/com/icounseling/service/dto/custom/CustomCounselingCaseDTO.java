package com.icounseling.service.dto.custom;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import com.icounseling.domain.enumeration.CounselingCaseStatus;
import com.icounseling.service.dto.EducationDTO;
import com.icounseling.service.dto.ScoreDTO;
import com.icounseling.service.dto.UserDTO;
import com.icounseling.service.dto.VisitorDTO;

/**
 * A DTO for the {@link com.icounseling.domain.CounselingCase} entity.
 */
public class CustomCounselingCaseDTO implements Serializable {

    private Long id;

    @NotNull
    private CounselingCaseStatus status;

    private UserDTO userDTO;

    private ScoreDTO scoreDTO;

    private EducationDTO educationDTO;

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

    public Long getCounselorId() {
        return counselorId;
    }

    public void setCounselorId(Long counselorId) {
        this.counselorId = counselorId;
    }

    public ScoreDTO getScoreDTO() {
        return scoreDTO;
    }

    public void setScoreDTO(ScoreDTO scoreDTO) {
        this.scoreDTO = scoreDTO;
    }

    public EducationDTO getEducationDTO() {
        return educationDTO;
    }

    public void setEducationDTO(EducationDTO educationDTO) {
        this.educationDTO = educationDTO;
    }

    public UserDTO getUserDTO() {
        return userDTO;
    }

    public void setUserDTO(UserDTO userDTO) {
        this.userDTO = userDTO;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CustomCounselingCaseDTO counselingCaseDTO = (CustomCounselingCaseDTO) o;
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
            ", user=" + getUserDTO() +
            ", counselor=" + getCounselorId() +
            "}";
    }
}
