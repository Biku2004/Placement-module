export interface Application {
  jobPostId: number; // Updated from jobId
  name: string;
  address: string;
  college: string;
  branch: string;
  course: string;
  photo?: File | null;
  resume?: File | null;
  cgpa: number;
  skills: string[];
  contact: string;
  email: string;
  achievements: string;
}