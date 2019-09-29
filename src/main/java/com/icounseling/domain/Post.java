package com.icounseling.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.icounseling.domain.enumeration.DocumentFormat;

/**
 * A Post.
 */
@Entity
@Table(name = "post")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Post implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    
    @Lob
    @Column(name = "image", nullable = false)
    private byte[] image;

    @Column(name = "image_content_type", nullable = false)
    private String imageContentType;

    @NotNull
    @Column(name = "like_numbers", nullable = false)
    private Integer likeNumbers;

    @NotNull
    @Column(name = "number_of_views", nullable = false)
    private Integer numberOfViews;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "document_format", nullable = false)
    private DocumentFormat documentFormat;

    @OneToOne
    @JoinColumn(unique = true)
    private Schedule schedule;

    @OneToMany(mappedBy = "post")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Comment> comments = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("posts")
    private Counselor counselor;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getImage() {
        return image;
    }

    public Post image(byte[] image) {
        this.image = image;
        return this;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public Post imageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public Integer getLikeNumbers() {
        return likeNumbers;
    }

    public Post likeNumbers(Integer likeNumbers) {
        this.likeNumbers = likeNumbers;
        return this;
    }

    public void setLikeNumbers(Integer likeNumbers) {
        this.likeNumbers = likeNumbers;
    }

    public Integer getNumberOfViews() {
        return numberOfViews;
    }

    public Post numberOfViews(Integer numberOfViews) {
        this.numberOfViews = numberOfViews;
        return this;
    }

    public void setNumberOfViews(Integer numberOfViews) {
        this.numberOfViews = numberOfViews;
    }

    public DocumentFormat getDocumentFormat() {
        return documentFormat;
    }

    public Post documentFormat(DocumentFormat documentFormat) {
        this.documentFormat = documentFormat;
        return this;
    }

    public void setDocumentFormat(DocumentFormat documentFormat) {
        this.documentFormat = documentFormat;
    }

    public Schedule getSchedule() {
        return schedule;
    }

    public Post schedule(Schedule schedule) {
        this.schedule = schedule;
        return this;
    }

    public void setSchedule(Schedule schedule) {
        this.schedule = schedule;
    }

    public Set<Comment> getComments() {
        return comments;
    }

    public Post comments(Set<Comment> comments) {
        this.comments = comments;
        return this;
    }

    public Post addComment(Comment comment) {
        this.comments.add(comment);
        comment.setPost(this);
        return this;
    }

    public Post removeComment(Comment comment) {
        this.comments.remove(comment);
        comment.setPost(null);
        return this;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
    }

    public Counselor getCounselor() {
        return counselor;
    }

    public Post counselor(Counselor counselor) {
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
        if (!(o instanceof Post)) {
            return false;
        }
        return id != null && id.equals(((Post) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Post{" +
            "id=" + getId() +
            ", image='" + getImage() + "'" +
            ", imageContentType='" + getImageContentType() + "'" +
            ", likeNumbers=" + getLikeNumbers() +
            ", numberOfViews=" + getNumberOfViews() +
            ", documentFormat='" + getDocumentFormat() + "'" +
            "}";
    }
}
