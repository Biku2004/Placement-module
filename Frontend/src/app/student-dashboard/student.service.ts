import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { StudentProfile } from './student-profile/student-profile';
import { Job } from './student-profile/job';
import { Application } from './student-profile/application';
import { AppliedJob } from './student-profile/applied-job';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:8080/api/recruiter/jobs'; // Updated to match JobPostingController

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  // // Fetch all SENT job postings for students
  // getJobs(): Observable<Job[]> {
  //   return this.http.get<Job[]>(this.apiUrl, { headers: this.getHeaders() });
  // }

  // Fetch a specific job by ID (if needed)
  getJobById(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Submit an application to a job posting
  submitApplication(application: Application): Observable<any> {
    const formData = new FormData();
    formData.append('jobId', application.jobPostId.toString()); // Changed from jobId to jobPostId
    formData.append('name', application.name);
    formData.append('address', application.address);
    formData.append('college', application.college);
    formData.append('branch', application.branch);
    formData.append('course', application.course);
    if (application.photo) formData.append('photo', application.photo);
    if (application.resume) formData.append('resume', application.resume);
    formData.append('cgpa', application.cgpa.toString());
    formData.append('skills', JSON.stringify(application.skills));
    formData.append('contact', application.contact);
    formData.append('email', application.email);
    formData.append('achievements', application.achievements);

    return this.http.post(`${this.apiUrl}/${application.jobPostId}/apply`, formData, { headers: this.getHeaders() });
  }
  // Simple apply action (if detailed form isn’t needed)
  applyToJob(jobId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${jobId}/apply`, {}, { headers: this.getHeaders() });
  }

  // Fetch applied jobs for the student
  getAppliedJobs(): Observable<AppliedJob[]> {
    return this.http.get<AppliedJob[]>(`${this.apiUrl}/my-applications`, { headers: this.getHeaders() });
  }

  getProgress(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/progress`);
  }

  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/events`);
  }

  getNotifications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/notifications`);
  }

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/student/jobs`, { headers: this.getHeaders() });
  }
}