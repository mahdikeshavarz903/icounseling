package com.icounseling.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.icounseling.domain.enumeration.CategoryType;

/**
 * A Category.
 */
@Entity
@Table(name = "category")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Category implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(name = "images")
    private byte[] images;

    @Column(name = "images_content_type")
    private String imagesContentType;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "category_type", nullable = false)
    private CategoryType categoryType;

    @OneToMany(mappedBy = "gategory")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Document> documents = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("categories")
    private Library library;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getImages() {
        return images;
    }

    public Category images(byte[] images) {
        this.images = images;
        return this;
    }

    public void setImages(byte[] images) {
        this.images = images;
    }

    public String getImagesContentType() {
        return imagesContentType;
    }

    public Category imagesContentType(String imagesContentType) {
        this.imagesContentType = imagesContentType;
        return this;
    }

    public void setImagesContentType(String imagesContentType) {
        this.imagesContentType = imagesContentType;
    }

    public CategoryType getCategoryType() {
        return categoryType;
    }

    public Category categoryType(CategoryType categoryType) {
        this.categoryType = categoryType;
        return this;
    }

    public void setCategoryType(CategoryType categoryType) {
        this.categoryType = categoryType;
    }

    public Set<Document> getDocuments() {
        return documents;
    }

    public Category documents(Set<Document> documents) {
        this.documents = documents;
        return this;
    }

    public Category addDocument(Document document) {
        this.documents.add(document);
        document.setGategory(this);
        return this;
    }

    public Category removeDocument(Document document) {
        this.documents.remove(document);
        document.setGategory(null);
        return this;
    }

    public void setDocuments(Set<Document> documents) {
        this.documents = documents;
    }

    public Library getLibrary() {
        return library;
    }

    public Category library(Library library) {
        this.library = library;
        return this;
    }

    public void setLibrary(Library library) {
        this.library = library;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Category)) {
            return false;
        }
        return id != null && id.equals(((Category) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Category{" +
            "id=" + getId() +
            ", images='" + getImages() + "'" +
            ", imagesContentType='" + getImagesContentType() + "'" +
            ", categoryType='" + getCategoryType() + "'" +
            "}";
    }
}
