package com.icounseling.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Visitor.
 */
@Entity
@Table(name = "visitor")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Visitor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private Score score;

    @OneToOne
    @JoinColumn(unique = true)
    private Education education;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToMany(mappedBy = "visitor")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Transaction> transactions = new HashSet<>();

    @OneToMany(mappedBy = "visitor")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Job> jobs = new HashSet<>();

    @OneToOne(mappedBy = "visitor")
    @JsonIgnore
    private CounselingCase counselingCase;

    @OneToOne(mappedBy = "visitor")
    @JsonIgnore
    private Library library;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Score getScore() {
        return score;
    }

    public Visitor score(Score score) {
        this.score = score;
        return this;
    }

    public void setScore(Score score) {
        this.score = score;
    }

    public Education getEducation() {
        return education;
    }

    public Visitor education(Education education) {
        this.education = education;
        return this;
    }

    public void setEducation(Education education) {
        this.education = education;
    }

    public User getUser() {
        return user;
    }

    public Visitor user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Transaction> getTransactions() {
        return transactions;
    }

    public Visitor transactions(Set<Transaction> transactions) {
        this.transactions = transactions;
        return this;
    }

    public Visitor addTransaction(Transaction transaction) {
        this.transactions.add(transaction);
        transaction.setVisitor(this);
        return this;
    }

    public Visitor removeTransaction(Transaction transaction) {
        this.transactions.remove(transaction);
        transaction.setVisitor(null);
        return this;
    }

    public void setTransactions(Set<Transaction> transactions) {
        this.transactions = transactions;
    }

    public Set<Job> getJobs() {
        return jobs;
    }

    public Visitor jobs(Set<Job> jobs) {
        this.jobs = jobs;
        return this;
    }

    public Visitor addJob(Job job) {
        this.jobs.add(job);
        job.setVisitor(this);
        return this;
    }

    public Visitor removeJob(Job job) {
        this.jobs.remove(job);
        job.setVisitor(null);
        return this;
    }

    public void setJobs(Set<Job> jobs) {
        this.jobs = jobs;
    }

    public CounselingCase getCounselingCase() {
        return counselingCase;
    }

    public Visitor counselingCase(CounselingCase counselingCase) {
        this.counselingCase = counselingCase;
        return this;
    }

    public void setCounselingCase(CounselingCase counselingCase) {
        this.counselingCase = counselingCase;
    }

    public Library getLibrary() {
        return library;
    }

    public Visitor library(Library library) {
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
        if (!(o instanceof Visitor)) {
            return false;
        }
        return id != null && id.equals(((Visitor) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Visitor{" +
            "id=" + getId() +
            "}";
    }
}
