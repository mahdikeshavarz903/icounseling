package com.icounseling.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

import com.icounseling.domain.enumeration.RepeatTime;

import com.icounseling.domain.enumeration.RepeatUntil;

/**
 * A Task.
 */
@Entity
@Table(name = "task")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Task implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "repeat_time", nullable = false)
    private RepeatTime repeatTime;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "repeat_until", nullable = false)
    private RepeatUntil repeatUntil;

    @OneToOne
    @JoinColumn(unique = true)
    private Reminder reminder;

    @OneToOne
    @JoinColumn(unique = true)
    private Schedule schedule;

    @ManyToOne
    @JsonIgnoreProperties("tasks")
    private Planning planning;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public RepeatTime getRepeatTime() {
        return repeatTime;
    }

    public Task repeatTime(RepeatTime repeatTime) {
        this.repeatTime = repeatTime;
        return this;
    }

    public void setRepeatTime(RepeatTime repeatTime) {
        this.repeatTime = repeatTime;
    }

    public RepeatUntil getRepeatUntil() {
        return repeatUntil;
    }

    public Task repeatUntil(RepeatUntil repeatUntil) {
        this.repeatUntil = repeatUntil;
        return this;
    }

    public void setRepeatUntil(RepeatUntil repeatUntil) {
        this.repeatUntil = repeatUntil;
    }

    public Reminder getReminder() {
        return reminder;
    }

    public Task reminder(Reminder reminder) {
        this.reminder = reminder;
        return this;
    }

    public void setReminder(Reminder reminder) {
        this.reminder = reminder;
    }

    public Schedule getSchedule() {
        return schedule;
    }

    public Task schedule(Schedule schedule) {
        this.schedule = schedule;
        return this;
    }

    public void setSchedule(Schedule schedule) {
        this.schedule = schedule;
    }

    public Planning getPlanning() {
        return planning;
    }

    public Task planning(Planning planning) {
        this.planning = planning;
        return this;
    }

    public void setPlanning(Planning planning) {
        this.planning = planning;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Task)) {
            return false;
        }
        return id != null && id.equals(((Task) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Task{" +
            "id=" + getId() +
            ", repeatTime='" + getRepeatTime() + "'" +
            ", repeatUntil='" + getRepeatUntil() + "'" +
            "}";
    }
}
