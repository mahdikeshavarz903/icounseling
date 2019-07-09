package com.icounseling.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;
import com.icounseling.domain.enumeration.ScoreDegree;

/**
 * A DTO for the {@link com.icounseling.domain.Score} entity.
 */
public class ScoreDTO implements Serializable {

    private Long id;

    @NotNull
    private Float total;

    
    @Lob
    private byte[] image;

    private String imageContentType;
    @NotNull
    private ScoreDegree degree;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getTotal() {
        return total;
    }

    public void setTotal(Float total) {
        this.total = total;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public ScoreDegree getDegree() {
        return degree;
    }

    public void setDegree(ScoreDegree degree) {
        this.degree = degree;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ScoreDTO scoreDTO = (ScoreDTO) o;
        if (scoreDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), scoreDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ScoreDTO{" +
            "id=" + getId() +
            ", total=" + getTotal() +
            ", image='" + getImage() + "'" +
            ", degree='" + getDegree() + "'" +
            "}";
    }
}
