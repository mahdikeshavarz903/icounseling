package com.icounseling.service.dto;

import com.icounseling.domain.Education;
import com.icounseling.domain.Score;
import com.icounseling.domain.User;
import com.icounseling.domain.enumeration.ConsultantType;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.icounseling.domain.Counselor} entity.
 */
public class CustomCounselorDTO implements Serializable {

    private Long id;

    @NotNull
    private ConsultantType consultantType;


    private Education education;

    private Score score;

    private User user;

    public Education getEducation() {
        return education;
    }

    public void setEducation(Education education) {
        this.education = education;
    }

    public Score getScore() {
        return score;
    }

    public void setScore(Score score) {
        this.score = score;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

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
            ", education=" + getEducation() +
            ", score=" + getScore() +
            ", user=" + getUser() +
            "}";
    }
}
