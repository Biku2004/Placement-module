package com.spring.demo.backendplacementcell.entities;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "job_postings")
public class JobPosting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String companyName;
    private String website;
    private String companyProfile;
    private String eligibleCourses;
    private String batchYear;
    private String jobRole;
    private String jobLocation;
    private String annualCTC;
    private String rolesResponsibilities;
    private String skillsQualifications;
    private String selectionProcess;
    private String registrationProcess;
    private String lastDateToRegister;
    private String benefitsIncentives;
    private String roleDetails;
    private String expectedSkillsTools;
    private String createdBy;

//    private String status; // DRAFT, PENDING, APPROVED, SENT
    private boolean isHidden; // New field to hide job post
    private String archiveYear; // New field for archiving (e.g., "Year 2022-26")


    @Column(nullable = false)
    private String status = "DRAFT"; // Default to "DRAFT"

    @ElementCollection
    private List<AdditionalSection> additionalSections;

    @Lob // Large Object for storing image data
    private byte[] logo; // Stores the image as binary data

    @Embeddable
    public static class AdditionalSection {
        private String label;
        private String value;

        public String getLabel() {
            return label;
        }

        public void setLabel(String label) {
            this.label = label;
        }

        public String getValue() {
            return value;
        }

        public void setValue(String value) {
            this.value = value;
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getCompanyProfile() {
        return companyProfile;
    }

    public void setCompanyProfile(String companyProfile) {
        this.companyProfile = companyProfile;
    }

    public String getEligibleCourses() {
        return eligibleCourses;
    }

    public void setEligibleCourses(String eligibleCourses) {
        this.eligibleCourses = eligibleCourses;
    }

    public String getBatchYear() {
        return batchYear;
    }

    public void setBatchYear(String batchYear) {
        this.batchYear = batchYear;
    }

    public String getJobRole() {
        return jobRole;
    }

    public void setJobRole(String jobRole) {
        this.jobRole = jobRole;
    }

    public String getJobLocation() {
        return jobLocation;
    }

    public void setJobLocation(String jobLocation) {
        this.jobLocation = jobLocation;
    }

    public String getAnnualCTC() {
        return annualCTC;
    }

    public void setAnnualCTC(String annualCTC) {
        this.annualCTC = annualCTC;
    }

    public String getRolesResponsibilities() {
        return rolesResponsibilities;
    }

    public void setRolesResponsibilities(String rolesResponsibilities) {
        this.rolesResponsibilities = rolesResponsibilities;
    }

    public String getSkillsQualifications() {
        return skillsQualifications;
    }

    public void setSkillsQualifications(String skillsQualifications) {
        this.skillsQualifications = skillsQualifications;
    }

    public String getSelectionProcess() {
        return selectionProcess;
    }

    public void setSelectionProcess(String selectionProcess) {
        this.selectionProcess = selectionProcess;
    }

    public String getRegistrationProcess() {
        return registrationProcess;
    }

    public void setRegistrationProcess(String registrationProcess) {
        this.registrationProcess = registrationProcess;
    }

    public String getLastDateToRegister() {
        return lastDateToRegister;
    }

    public void setLastDateToRegister(String lastDateToRegister) {
        this.lastDateToRegister = lastDateToRegister;
    }

    public String getBenefitsIncentives() {
        return benefitsIncentives;
    }

    public void setBenefitsIncentives(String benefitsIncentives) {
        this.benefitsIncentives = benefitsIncentives;
    }

    public String getRoleDetails() {
        return roleDetails;
    }

    public void setRoleDetails(String roleDetails) {
        this.roleDetails = roleDetails;
    }

    public String getExpectedSkillsTools() {
        return expectedSkillsTools;
    }

    public void setExpectedSkillsTools(String expectedSkillsTools) {
        this.expectedSkillsTools = expectedSkillsTools;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public List<AdditionalSection> getAdditionalSections() {
        return additionalSections;
    }

    public void setAdditionalSections(List<AdditionalSection> additionalSections) {
        this.additionalSections = additionalSections;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public byte[] getLogo() {
        return logo;
    }

    public void setLogo(byte[] logo) {
        this.logo = logo;
    }

    public boolean isHidden() {
        return isHidden;
    }

    public void setHidden(boolean hidden) {
        isHidden = hidden;
    }

    public String getArchiveYear() {
        return archiveYear;
    }

    public void setArchiveYear(String archiveYear) {
        this.archiveYear = archiveYear;
    }

    public JobPosting() {
        this.isHidden = false; // Default to visible
    }
}