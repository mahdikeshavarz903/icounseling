package com.icounseling.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.icounseling.domain.enumeration.CounselingCaseStatus;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * A CounselingCase.
 */
@Entity
@Table(name = "counseling_case")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CounselingCase implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private CounselingCaseStatus status;

    @OneToOne(cascade = {CascadeType.ALL})
    @JoinColumn(unique = true)
    private Visitor visitor;

    @ManyToOne(cascade = {CascadeType.ALL})
    @JsonIgnoreProperties("counselingCases")
    private Counselor counselor;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CounselingCaseStatus getStatus() {
        return status;
    }

    public CounselingCase status(CounselingCaseStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(CounselingCaseStatus status) {
        this.status = status;
    }

    public Visitor getVisitor() {
        return visitor;
    }

    public CounselingCase visitor(Visitor visitor) {
        this.visitor = visitor;
        return this;
    }

    public void setVisitor(Visitor visitor) {
        this.visitor = visitor;
    }

    public Counselor getCounselor() {
        return counselor;
    }

    public CounselingCase counselor(Counselor counselor) {
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
        if (!(o instanceof CounselingCase)) {
            return false;
        }
        return id != null && id.equals(((CounselingCase) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "CounselingCase{" +
            "id=" + getId() +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
