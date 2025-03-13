// src/main/java/com/spring/demo/backendplacementcell/entities/Company.java
package com.spring.demo.backendplacementcell.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String logoUrl;
    private String industry;
    private String location;
    private String website;
    private String description;
    private String companyType;
    private String companySize;
    private Integer establishedYear;
    private String primaryContactName;
    private String primaryContactEmail;
    private String primaryContactPhone;
    private String secondaryContactName;
    private String secondaryContactEmail;
    private String secondaryContactPhone;

    private String createdBy;

    public Company() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCompanyType() {
        return companyType;
    }

    public void setCompanyType(String companyType) {
        this.companyType = companyType;
    }

    public String getCompanySize() {
        return companySize;
    }

    public void setCompanySize(String companySize) {
        this.companySize = companySize;
    }

    public Integer getEstablishedYear() {
        return establishedYear;
    }

    public void setEstablishedYear(Integer establishedYear) {
        this.establishedYear = establishedYear;
    }

    public String getPrimaryContactName() {
        return primaryContactName;
    }

    public void setPrimaryContactName(String primaryContactName) {
        this.primaryContactName = primaryContactName;
    }

    public String getPrimaryContactEmail() {
        return primaryContactEmail;
    }

    public void setPrimaryContactEmail(String primaryContactEmail) {
        this.primaryContactEmail = primaryContactEmail;
    }

    public String getPrimaryContactPhone() {
        return primaryContactPhone;
    }

    public void setPrimaryContactPhone(String primaryContactPhone) {
        this.primaryContactPhone = primaryContactPhone;
    }

    public String getSecondaryContactName() {
        return secondaryContactName;
    }

    public void setSecondaryContactName(String secondaryContactName) {
        this.secondaryContactName = secondaryContactName;
    }

    public String getSecondaryContactEmail() {
        return secondaryContactEmail;
    }

    public void setSecondaryContactEmail(String secondaryContactEmail) {
        this.secondaryContactEmail = secondaryContactEmail;
    }

    public String getSecondaryContactPhone() {
        return secondaryContactPhone;
    }

    public void setSecondaryContactPhone(String secondaryContactPhone) {
        this.secondaryContactPhone = secondaryContactPhone;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Company(Long id, String name, String logoUrl, String industry, String location, String website,
                   String description, String companyType, String companySize, Integer establishedYear,
                   String primaryContactName, String primaryContactEmail, String primaryContactPhone,
                   String secondaryContactName, String secondaryContactEmail, String secondaryContactPhone,
                   String createdBy) {
        this.id = id;
        this.name = name;
        this.logoUrl = logoUrl;
        this.industry = industry;
        this.location = location;
        this.website = website;
        this.description = description;
        this.companyType = companyType;
        this.companySize = companySize;
        this.establishedYear = establishedYear;
        this.primaryContactName = primaryContactName;
        this.primaryContactEmail = primaryContactEmail;
        this.primaryContactPhone = primaryContactPhone;
        this.secondaryContactName = secondaryContactName;
        this.secondaryContactEmail = secondaryContactEmail;
        this.secondaryContactPhone = secondaryContactPhone;
        this.createdBy = createdBy;
    }
}