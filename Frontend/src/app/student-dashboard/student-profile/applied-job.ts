export interface AppliedJob {
  jobPostId: number;         // Updated from jobId, maps to JobApplication.jobPostId
  companyName: string;       // Maps to JobApplication.companyName
  jobRole: string;           // Maps to JobApplication.jobRole
  logo : string;
  logoUrl?: string; // Changed from File to string for base64             // Placeholder (not in JobApplication, set in frontend)
  applicationDate: string;   // Maps to JobApplication.applicationDate (converted to string)
  status: string;            // Maps to JobApplication.status
  rounds: {
    name: string;            // Maps to JobApplication.Round.name
    status: string;          // Maps to JobApplication.Round.status
    date?: string;           // Maps to JobApplication.Round.date (optional)
  }[];
  examLink?: string; // Add optional exam link
}