package com.icounseling.service.dto.custom;

import com.icounseling.domain.Education;
import com.icounseling.domain.Score;
import com.icounseling.service.dto.UserDTO;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.icounseling.domain.Visitor} entity.
 */
public class CustomVisitorDTO implements Serializable {

    private Long id;


    private Score scoreDTO;

    private Education educationDTO;

    private UserDTO userDTO;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Score getScoreDTO() {
        return scoreDTO;
    }

    public void setScoreDTO(Score scoreDTO) {
        this.scoreDTO = scoreDTO;
    }

    public Education getEducationDTO() {
        return educationDTO;
    }

    public void setEducationDTO(Education educationDTO) {
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

        com.icounseling.service.dto.VisitorDTO visitorDTO = (com.icounseling.service.dto.VisitorDTO) o;
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
            ", score=" + getScoreDTO().getId() +
            ", education=" + getEducationDTO().getId()+
            ", user=" + getUserDTO().getId() +
            "}";
    }
}
