package com.icounseling.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.icounseling.domain.enumeration.EducationDegree;

/**
 * A Education.
 */
@Entity
@Table(name = "education")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Education implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private EducationDegree type;

    @OneToMany(mappedBy = "education")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Reseume> reseumes = new HashSet<>();

    @OneToOne(mappedBy = "education")
    @JsonIgnore
    private Counselor counselor;

    @OneToOne(mappedBy = "education")
    @JsonIgnore
    private Visitor visitor;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EducationDegree getType() {
        return type;
    }

    public Education type(EducationDegree type) {
        this.type = type;
        return this;
    }

    public void setType(EducationDegree type) {
        this.type = type;
    }

    public Set<Reseume> getReseumes() {
        return reseumes;
    }

    public Education reseumes(Set<Reseume> reseumes) {
        this.reseumes = reseumes;
        return this;
    }

    public Education addReseume(Reseume reseume) {
        this.reseumes.add(reseume);
        reseume.setEducation(this);
        return this;
    }

    public Education removeReseume(Reseume reseume) {
        this.reseumes.remove(reseume);
        reseume.setEducation(null);
        return this;
    }

    public void setReseumes(Set<Reseume> reseumes) {
        this.reseumes = reseumes;
    }

    public Counselor getCounselor() {
        return counselor;
    }

    public Education counselor(Counselor counselor) {
        this.counselor = counselor;
        return this;
    }

    public void setCounselor(Counselor counselor) {
        this.counselor = counselor;
    }

    public Visitor getVisitor() {
        return visitor;
    }

    public Education visitor(Visitor visitor) {
        this.visitor = visitor;
        return this;
    }

    public void setVisitor(Visitor visitor) {
        this.visitor = visitor;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Education)) {
            return false;
        }
        return id != null && id.equals(((Education) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Education{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            "}";
    }
}
