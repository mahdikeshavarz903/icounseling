package com.icounseling.service.dto;
import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;
import com.icounseling.domain.enumeration.PaymentType;
import com.icounseling.domain.enumeration.DocumentFormat;

/**
 * A DTO for the {@link com.icounseling.domain.Document} entity.
 */
public class DocumentDTO implements Serializable {

    private Long id;

    @NotNull
    private String title;

    
    @Lob
    private byte[] description;

    private String descriptionContentType;
    @NotNull
    private Float price;

    private LocalDate publishedDate;

    private PaymentType paymentType;

    private DocumentFormat documentFormat;

    
    @Lob
    private byte[] imagesGallery;

    private String imagesGalleryContentType;
    @NotNull
    private String tag;


    private Long rateId;

    private String rateIndex;

    private Long commentId;

    private Long gategoryId;

    private String gategoryCategoryType;

    private Long counselorId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public byte[] getDescription() {
        return description;
    }

    public void setDescription(byte[] description) {
        this.description = description;
    }

    public String getDescriptionContentType() {
        return descriptionContentType;
    }

    public void setDescriptionContentType(String descriptionContentType) {
        this.descriptionContentType = descriptionContentType;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public LocalDate getPublishedDate() {
        return publishedDate;
    }

    public void setPublishedDate(LocalDate publishedDate) {
        this.publishedDate = publishedDate;
    }

    public PaymentType getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(PaymentType paymentType) {
        this.paymentType = paymentType;
    }

    public DocumentFormat getDocumentFormat() {
        return documentFormat;
    }

    public void setDocumentFormat(DocumentFormat documentFormat) {
        this.documentFormat = documentFormat;
    }

    public byte[] getImagesGallery() {
        return imagesGallery;
    }

    public void setImagesGallery(byte[] imagesGallery) {
        this.imagesGallery = imagesGallery;
    }

    public String getImagesGalleryContentType() {
        return imagesGalleryContentType;
    }

    public void setImagesGalleryContentType(String imagesGalleryContentType) {
        this.imagesGalleryContentType = imagesGalleryContentType;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public Long getRateId() {
        return rateId;
    }

    public void setRateId(Long rateId) {
        this.rateId = rateId;
    }

    public String getRateIndex() {
        return rateIndex;
    }

    public void setRateIndex(String rateIndex) {
        this.rateIndex = rateIndex;
    }

    public Long getCommentId() {
        return commentId;
    }

    public void setCommentId(Long commentId) {
        this.commentId = commentId;
    }

    public Long getGategoryId() {
        return gategoryId;
    }

    public void setGategoryId(Long categoryId) {
        this.gategoryId = categoryId;
    }

    public String getGategoryCategoryType() {
        return gategoryCategoryType;
    }

    public void setGategoryCategoryType(String categoryCategoryType) {
        this.gategoryCategoryType = categoryCategoryType;
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

        DocumentDTO documentDTO = (DocumentDTO) o;
        if (documentDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), documentDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DocumentDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", price=" + getPrice() +
            ", publishedDate='" + getPublishedDate() + "'" +
            ", paymentType='" + getPaymentType() + "'" +
            ", documentFormat='" + getDocumentFormat() + "'" +
            ", imagesGallery='" + getImagesGallery() + "'" +
            ", tag='" + getTag() + "'" +
            ", rate=" + getRateId() +
            ", rate='" + getRateIndex() + "'" +
            ", comment=" + getCommentId() +
            ", gategory=" + getGategoryId() +
            ", gategory='" + getGategoryCategoryType() + "'" +
            ", counselor=" + getCounselorId() +
            "}";
    }
}
