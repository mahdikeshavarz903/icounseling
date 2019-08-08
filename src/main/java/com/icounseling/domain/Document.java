package com.icounseling.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

import com.icounseling.domain.enumeration.PaymentType;

import com.icounseling.domain.enumeration.DocumentFormat;

/**
 * A Document.
 */
@Entity
@Table(name = "document")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Document implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    
    @Lob
    @Column(name = "description", nullable = false)
    private byte[] description;

    @Column(name = "description_content_type", nullable = false)
    private String descriptionContentType;

    @NotNull
    @Column(name = "price", nullable = false)
    private Float price;

    @Column(name = "published_date")
    private LocalDate publishedDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_type")
    private PaymentType paymentType;

    @Enumerated(EnumType.STRING)
    @Column(name = "document_format")
    private DocumentFormat documentFormat;

    
    @Lob
    @Column(name = "images_gallery", nullable = false)
    private byte[] imagesGallery;

    @Column(name = "images_gallery_content_type", nullable = false)
    private String imagesGalleryContentType;

    @NotNull
    @Column(name = "tag", nullable = false)
    private String tag;

    @OneToOne
    @JoinColumn(unique = true)
    private Rate rate;

    @OneToOne
    @JoinColumn(unique = true)
    private Comment comment;

    @ManyToOne
    @JsonIgnoreProperties("documents")
    private Category gategory;

    @ManyToOne
    @JsonIgnoreProperties("documents")
    private Counselor counselor;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Document title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public byte[] getDescription() {
        return description;
    }

    public Document description(byte[] description) {
        this.description = description;
        return this;
    }

    public void setDescription(byte[] description) {
        this.description = description;
    }

    public String getDescriptionContentType() {
        return descriptionContentType;
    }

    public Document descriptionContentType(String descriptionContentType) {
        this.descriptionContentType = descriptionContentType;
        return this;
    }

    public void setDescriptionContentType(String descriptionContentType) {
        this.descriptionContentType = descriptionContentType;
    }

    public Float getPrice() {
        return price;
    }

    public Document price(Float price) {
        this.price = price;
        return this;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public LocalDate getPublishedDate() {
        return publishedDate;
    }

    public Document publishedDate(LocalDate publishedDate) {
        this.publishedDate = publishedDate;
        return this;
    }

    public void setPublishedDate(LocalDate publishedDate) {
        this.publishedDate = publishedDate;
    }

    public PaymentType getPaymentType() {
        return paymentType;
    }

    public Document paymentType(PaymentType paymentType) {
        this.paymentType = paymentType;
        return this;
    }

    public void setPaymentType(PaymentType paymentType) {
        this.paymentType = paymentType;
    }

    public DocumentFormat getDocumentFormat() {
        return documentFormat;
    }

    public Document documentFormat(DocumentFormat documentFormat) {
        this.documentFormat = documentFormat;
        return this;
    }

    public void setDocumentFormat(DocumentFormat documentFormat) {
        this.documentFormat = documentFormat;
    }

    public byte[] getImagesGallery() {
        return imagesGallery;
    }

    public Document imagesGallery(byte[] imagesGallery) {
        this.imagesGallery = imagesGallery;
        return this;
    }

    public void setImagesGallery(byte[] imagesGallery) {
        this.imagesGallery = imagesGallery;
    }

    public String getImagesGalleryContentType() {
        return imagesGalleryContentType;
    }

    public Document imagesGalleryContentType(String imagesGalleryContentType) {
        this.imagesGalleryContentType = imagesGalleryContentType;
        return this;
    }

    public void setImagesGalleryContentType(String imagesGalleryContentType) {
        this.imagesGalleryContentType = imagesGalleryContentType;
    }

    public String getTag() {
        return tag;
    }

    public Document tag(String tag) {
        this.tag = tag;
        return this;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public Rate getRate() {
        return rate;
    }

    public Document rate(Rate rate) {
        this.rate = rate;
        return this;
    }

    public void setRate(Rate rate) {
        this.rate = rate;
    }

    public Comment getComment() {
        return comment;
    }

    public Document comment(Comment comment) {
        this.comment = comment;
        return this;
    }

    public void setComment(Comment comment) {
        this.comment = comment;
    }

    public Category getGategory() {
        return gategory;
    }

    public Document gategory(Category category) {
        this.gategory = category;
        return this;
    }

    public void setGategory(Category category) {
        this.gategory = category;
    }

    public Counselor getCounselor() {
        return counselor;
    }

    public Document counselor(Counselor counselor) {
        this.counselor = counselor;
        return this;
    }

    public void setCounselor(Counselor counselor) {
        this.counselor = counselor;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Document)) {
            return false;
        }
        return id != null && id.equals(((Document) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Document{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", descriptionContentType='" + getDescriptionContentType() + "'" +
            ", price=" + getPrice() +
            ", publishedDate='" + getPublishedDate() + "'" +
            ", paymentType='" + getPaymentType() + "'" +
            ", documentFormat='" + getDocumentFormat() + "'" +
            ", imagesGallery='" + getImagesGallery() + "'" +
            ", imagesGalleryContentType='" + getImagesGalleryContentType() + "'" +
            ", tag='" + getTag() + "'" +
            "}";
    }
}
