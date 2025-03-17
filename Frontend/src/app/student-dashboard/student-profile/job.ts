// export interface Job {
//   id: number;
//   companyName: string;
//   jobRole: string;
//   eligibleCourses: string;
//   lastDateToRegister: string;
//   salary: number;
//   branch: string;
//   location: string;
//   description: string;
//   logo: string;
//   type: string;
//   formLink?: string; // Optional external form link provided by recruiter
// }

export interface Job {
  id: number;                  // Maps to JobPosting.id (generic identifier)
  jobPostId: number;           // Explicitly added for JobPosting.id (specific to job post context)
  companyName: string;         // Maps to JobPosting.companyName
  jobRole: string;             // Maps to JobPosting.jobRole
  eligibleCourses: string;     // Maps to JobPosting.eligibleCourses
  lastDateToRegister: string;  // Maps to JobPosting.lastDateToRegister
  annualCTC: string;           // Maps to JobPosting.annualCTC (kept as string, parsed in frontend if needed)
  jobLocation: string;         // Maps to JobPosting.jobLocation
  rolesResponsibilities: string; // Maps to JobPosting.rolesResponsibilities
  roleDetails: string;         // Maps to JobPosting.roleDetails
  website?: string;            // Maps to JobPosting.website (optional)
  companyProfile?: string;     // Maps to JobPosting.companyProfile (optional)
  batchYear?: string;          // Maps to JobPosting.batchYear (optional)
  skillsQualifications?: string; // Maps to JobPosting.skillsQualifications (optional)
  selectionProcess?: string;   // Maps to JobPosting.selectionProcess (optional)
  registrationProcess?: string; // Maps to JobPosting.registrationProcess (optional)
  benefitsIncentives?: string; // Maps to JobPosting.benefitsIncentives (optional)
  expectedSkillsTools?: string; // Maps to JobPosting.expectedSkillsTools (optional)
  status?: string;             // Maps to JobPosting.status (optional, for filtering SENT jobs)
  formLink?: string; 
  // Frontend-specific fields (derived or placeholders)
  salary: number;              // Derived from JobPosting.annualCTC
  branch: string;              // Derived from JobPosting.eligibleCourses
  location: string;            // Alias for JobPosting.jobLocation
  description: string;         // Derived from JobPosting.roleDetails or rolesResponsibilities
  logo: string;                // Placeholder (not in JobPosting)
  type: string;                // Placeholder (not in JobPosting)
}