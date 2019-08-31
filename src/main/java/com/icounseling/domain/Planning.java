package com.icounseling.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Planning.
 */
@Entity
@Table(name = "planning")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Planning implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @NotNull
    @Column(name = "start_date_time", nullable = false)
    private Instant startDateTime;

    @NotNull
    @Column(name = "end_date_time", nullable = false)
    private Instant endDateTime;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @OneToMany(mappedBy = "planning")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Task> tasks = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("plannings")
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

    public Planning title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Instant getStartDateTime() {
        return startDateTime;
    }

    public Planning startDateTime(Instant startDateTime) {
        this.startDateTime = startDateTime;
        return this;
    }

    public void setStartDateTime(Instant startDateTime) {
        this.startDateTime = startDateTime;
    }

    public Instant getEndDateTime() {
        return endDateTime;
    }

    public Planning endDateTime(Instant endDateTime) {
        this.endDateTime = endDateTime;
        return this;
    }

    public void setEndDateTime(Instant endDateTime) {
        this.endDateTime = endDateTime;
    }

    public String getDescription() {
        return description;
    }

    public Planning description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Task> getTasks() {
        return tasks;
    }

    public Planning tasks(Set<Task> tasks) {
        this.tasks = tasks;
        return this;
    }

    public Planning addTask(Task task) {
        this.tasks.add(task);
        task.setPlanning(this);
        return this;
    }

    public Planning removeTask(Task task) {
        this.tasks.remove(task);
        task.setPlanning(null);
        return this;
    }

    public void setTasks(Set<Task> tasks) {
        this.tasks = tasks;
    }

    public Counselor getCounselor() {
        return counselor;
    }

    public Planning counselor(Counselor counselor) {
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
        if (!(o instanceof Planning)) {
            return false;
        }
        return id != null && id.equals(((Planning) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Planning{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", startDateTime='" + getStartDateTime() + "'" +
            ", endDateTime='" + getEndDateTime() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
