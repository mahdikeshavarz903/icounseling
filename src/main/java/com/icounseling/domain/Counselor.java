package com.icounseling.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.icounseling.domain.enumeration.ConsultantType;

/**
 * A Counselor.
 */
@Entity
@Table(name = "counselor")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Counselor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "consultant_type", nullable = false)
    private ConsultantType consultantType;

    @OneToOne
    @JoinColumn(unique = true)
    private Education education;

    @OneToOne
    @JoinColumn(unique = true)
    private Score score;

    @OneToMany(mappedBy = "counselor")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Post> posts = new HashSet<>();

    @OneToMany(mappedBy = "counselor")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Document> documents = new HashSet<>();

    @OneToMany(mappedBy = "counselor")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TimeReserved> timeReserveds = new HashSet<>();

    @OneToMany(mappedBy = "counselor")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Planning> plannings = new HashSet<>();

    @OneToMany(mappedBy = "counselor")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CounselingCase> counselingCases = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ConsultantType getConsultantType() {
        return consultantType;
    }

    public Counselor consultantType(ConsultantType consultantType) {
        this.consultantType = consultantType;
        return this;
    }

    public void setConsultantType(ConsultantType consultantType) {
        this.consultantType = consultantType;
    }

    public Education getEducation() {
        return education;
    }

    public Counselor education(Education education) {
        this.education = education;
        return this;
    }

    public void setEducation(Education education) {
        this.education = education;
    }

    public Score getScore() {
        return score;
    }

    public Counselor score(Score score) {
        this.score = score;
        return this;
    }

    public void setScore(Score score) {
        this.score = score;
    }

    public Set<Post> getPosts() {
        return posts;
    }

    public Counselor posts(Set<Post> posts) {
        this.posts = posts;
        return this;
    }

    public Counselor addPost(Post post) {
        this.posts.add(post);
        post.setCounselor(this);
        return this;
    }

    public Counselor removePost(Post post) {
        this.posts.remove(post);
        post.setCounselor(null);
        return this;
    }

    public void setPosts(Set<Post> posts) {
        this.posts = posts;
    }

    public Set<Document> getDocuments() {
        return documents;
    }

    public Counselor documents(Set<Document> documents) {
        this.documents = documents;
        return this;
    }

    public Counselor addDocument(Document document) {
        this.documents.add(document);
        document.setCounselor(this);
        return this;
    }

    public Counselor removeDocument(Document document) {
        this.documents.remove(document);
        document.setCounselor(null);
        return this;
    }

    public void setDocuments(Set<Document> documents) {
        this.documents = documents;
    }

    public Set<TimeReserved> getTimeReserveds() {
        return timeReserveds;
    }

    public Counselor timeReserveds(Set<TimeReserved> timeReserveds) {
        this.timeReserveds = timeReserveds;
        return this;
    }

    public Counselor addTimeReserved(TimeReserved timeReserved) {
        this.timeReserveds.add(timeReserved);
        timeReserved.setCounselor(this);
        return this;
    }

    public Counselor removeTimeReserved(TimeReserved timeReserved) {
        this.timeReserveds.remove(timeReserved);
        timeReserved.setCounselor(null);
        return this;
    }

    public void setTimeReserveds(Set<TimeReserved> timeReserveds) {
        this.timeReserveds = timeReserveds;
    }

    public Set<Planning> getPlannings() {
        return plannings;
    }

    public Counselor plannings(Set<Planning> plannings) {
        this.plannings = plannings;
        return this;
    }

    public Counselor addPlanning(Planning planning) {
        this.plannings.add(planning);
        planning.setCounselor(this);
        return this;
    }

    public Counselor removePlanning(Planning planning) {
        this.plannings.remove(planning);
        planning.setCounselor(null);
        return this;
    }

    public void setPlannings(Set<Planning> plannings) {
        this.plannings = plannings;
    }

    public Set<CounselingCase> getCounselingCases() {
        return counselingCases;
    }

    public Counselor counselingCases(Set<CounselingCase> counselingCases) {
        this.counselingCases = counselingCases;
        return this;
    }

    public Counselor addCounselingCase(CounselingCase counselingCase) {
        this.counselingCases.add(counselingCase);
        counselingCase.setCounselor(this);
        return this;
    }

    public Counselor removeCounselingCase(CounselingCase counselingCase) {
        this.counselingCases.remove(counselingCase);
        counselingCase.setCounselor(null);
        return this;
    }

    public void setCounselingCases(Set<CounselingCase> counselingCases) {
        this.counselingCases = counselingCases;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Counselor)) {
            return false;
        }
        return id != null && id.equals(((Counselor) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Counselor{" +
            "id=" + getId() +
            ", consultantType='" + getConsultantType() + "'" +
            "}";
    }
}
