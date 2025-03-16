export interface AdditionalSection {
    label: string;
    value: string;
  }
  
  export interface JobPost {
    companyName: string;
    website: string;
    companyProfile: string;
    eligibleCourses: string;
    batchYear: string;
    jobRole: string;
    jobLocation: string;
    annualCTC: string;
    rolesResponsibilities: string;
    skillsQualifications: string;
    selectionProcess: string;
    registrationProcess: string;
    lastDateToRegister: string;
    benefitsIncentives: string;
    roleDetails: string;
    expectedSkillsTools: string;
    additionalSections: AdditionalSection[];
  }