package com.spring.demo.backendplacementcell.entities;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public class InterviewSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String candidateName;
    private String interviewerName;
    private LocalDate interviewDate;
    private LocalTime interviewTime;
    private String status; // e.g., "Scheduled", "Completed", "Cancelled"

    // Constructors, getters, and setters
    public InterviewSchedule() {}

    public InterviewSchedule(String candidateName, String interviewerName, LocalDate interviewDate, LocalTime interviewTime, String status) {
        this.candidateName = candidateName;
        this.interviewerName = interviewerName;
        this.interviewDate = interviewDate;
        this.interviewTime = interviewTime;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCandidateName() {
        return candidateName;
    }

    public void setCandidateName(String candidateName) {
        this.candidateName = candidateName;
    }

    public String getInterviewerName() {
        return interviewerName;
    }

    public void setInterviewerName(String interviewerName) {
        this.interviewerName = interviewerName;
    }

    public LocalDate getInterviewDate() {
        return interviewDate;
    }

    public void setInterviewDate(LocalDate interviewDate) {
        this.interviewDate = interviewDate;
    }

    public LocalTime getInterviewTime() {
        return interviewTime;
    }

    public void setInterviewTime(LocalTime interviewTime) {
        this.interviewTime = interviewTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}