package com.icounseling.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;

/**
 * A TimeReserved.
 */
@Entity
@Table(name = "time_reserved")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TimeReserved implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "date_time", nullable = false)
    private Instant dateTime;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @ManyToOne
    @JsonIgnoreProperties("timeReserveds")
    private Counselor counselor;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDateTime() {
        return dateTime;
    }

    public TimeReserved dateTime(Instant dateTime) {
        this.dateTime = dateTime;
        return this;
    }

    public void setDateTime(Instant dateTime) {
        this.dateTime = dateTime;
    }

    public String getDescription() {
        return description;
    }

    public TimeReserved description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Counselor getCounselor() {
        return counselor;
    }

    public TimeReserved counselor(Counselor counselor) {
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
        if (!(o instanceof TimeReserved)) {
            return false;
        }
        return id != null && id.equals(((TimeReserved) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TimeReserved{" +
            "id=" + getId() +
            ", dateTime='" + getDateTime() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
