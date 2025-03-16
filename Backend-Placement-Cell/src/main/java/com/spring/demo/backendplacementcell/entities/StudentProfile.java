//package com.spring.demo.backendplacementcell.entities;
//
//import jakarta.persistence.*;
//
//@Entity
//@Table(name = "studentsprofile")
//public class StudentProfile {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String branch;
//    private Double cgpa;
//    private String skills; // Comma-separated
//    private Integer yearOfStudy;
//    private boolean consentGiven;
//
//    // Getters and Setters
//
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getBranch() {
//        return branch;
//    }
//
//    public void setBranch(String branch) {
//        this.branch = branch;
//    }
//
//    public Double getCgpa() {
//        return cgpa;
//    }
//
//    public void setCgpa(Double cgpa) {
//        this.cgpa = cgpa;
//    }
//
//    public String getSkills() {
//        return skills;
//    }
//
//    public void setSkills(String skills) {
//        this.skills = skills;
//    }
//
//    public Integer getYearOfStudy() {
//        return yearOfStudy;
//    }
//
//    public void setYearOfStudy(Integer yearOfStudy) {
//        this.yearOfStudy = yearOfStudy;
//    }
//
//    public boolean isConsentGiven() {
//        return consentGiven;
//    }
//
//    public void setConsentGiven(boolean consentGiven) {
//        this.consentGiven = consentGiven;
//    }
//}