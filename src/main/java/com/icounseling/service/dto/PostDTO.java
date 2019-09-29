package com.icounseling.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;
import com.icounseling.domain.enumeration.DocumentFormat;

/**
 * A DTO for the {@link com.icounseling.domain.Post} entity.
 */
public class PostDTO implements Serializable {

    private Long id;

    
    @Lob
    private byte[] image;

    private String imageContentType;
    @NotNull
    private Integer likeNumbers;

    @NotNull
    private Integer numberOfViews;

    @NotNull
    private DocumentFormat documentFormat;


    private Long scheduleId;

    private Long counselorId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Integer getLikeNumbers() {
        return likeNumbers;
    }

    public void setLikeNumbers(Integer likeNumbers) {
        this.likeNumbers = likeNumbers;
    }

    public Integer getNumberOfViews() {
        return numberOfViews;
    }

    public void setNumberOfViews(Integer numberOfViews) {
        this.numberOfViews = numberOfViews;
    }

    public DocumentFormat getDocumentFormat() {
        return documentFormat;
    }

    public void setDocumentFormat(DocumentFormat documentFormat) {
        this.documentFormat = documentFormat;
    }

    public Long getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(Long scheduleId) {
        this.scheduleId = scheduleId;
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

        PostDTO postDTO = (PostDTO) o;
        if (postDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), postDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PostDTO{" +
            "id=" + getId() +
            ", image='" + getImage() + "'" +
            ", likeNumbers=" + getLikeNumbers() +
            ", numberOfViews=" + getNumberOfViews() +
            ", documentFormat='" + getDocumentFormat() + "'" +
            ", schedule=" + getScheduleId() +
            ", counselor=" + getCounselorId() +
            "}";
    }
}
