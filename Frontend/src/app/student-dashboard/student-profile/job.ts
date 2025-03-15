export interface Job {
  id: number;
  companyName: string;
  jobRole: string;
  eligibleCourses: string;
  lastDateToRegister: string;
  salary: number;
  branch: string;
  location: string;
  description: string;
  logo: string;
  type: string;
  formLink?: string; // Optional external form link provided by recruiter
}