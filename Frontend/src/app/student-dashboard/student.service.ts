import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { StudentProfile } from './student-profile/student-profile';
import { Job } from './student-profile/job';
import { Application } from './student-profile/application';
import { AppliedJob } from './student-profile/applied-job';


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://your-api-url'; // Replace with your backend API

  constructor(private http: HttpClient) {}

  saveProfile(profile: StudentProfile): Observable<any> {
    return this.http.post(`${this.apiUrl}/profile`, profile);
  }

  // getJobs(): Observable<Job[]> {
  //   return this.http.get<Job[]>(`${this.apiUrl}/jobs`);
  // }

  getJobs(): Observable<Job[]> {
    // Mock data for demonstration (replace with actual API call)
    const mockJobs: Job[] = [
      {
        id: 1,
        companyName: 'TechCorp',
        jobRole: 'Software Engineer',
        eligibleCourses: 'CSE, ECE',
        lastDateToRegister: '2025-04-01',
        salary: 800000,
        branch: 'CSE',
        location: 'Bangalore',
        description: 'Develop scalable web applications.',
        logo: 'https://via.placeholder.com/50',
        type: 'Full-time'
      },
      {
        id: 2,
        companyName: 'InnoSoft',
        jobRole: 'Data Analyst Intern',
        eligibleCourses: 'CSE, ME',
        lastDateToRegister: '2025-03-20',
        salary: 300000,
        branch: 'CSE',
        location: 'Pune',
        description: 'Analyze data and generate insights.',
        logo: 'https://via.placeholder.com/50',
        type: 'Internship'
      }
    ];
    return of(mockJobs); // Replace with: this.http.get<Job[]>(`${this.apiUrl}/jobs`);
  }

  getJobById(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.apiUrl}/jobs/${id}`);
    // For mock: return of(mockJobs.find(job => job.id === id)!);
  }

  submitApplication(application: Application): Observable<any> {
    const formData = new FormData();
    formData.append('jobId', application.jobId.toString());
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

    return this.http.post(`${this.apiUrl}/apply`, formData);
  }


  applyToJob(job: Job): Observable<any> {
    return this.http.post(`${this.apiUrl}/apply`, job);
  }

  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/events`);
  }

  getNotifications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/notifications`);
  }

  getProgress(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/progress`);
  }

  getAppliedJobs(): Observable<AppliedJob[]> {
    // Mock data for demonstration
    const mockAppliedJobs: AppliedJob[] = [
      {
        jobId: 1,
        companyName: 'TechCorp',
        jobRole: 'Software Engineer',
        logo: 'https://via.placeholder.com/50',
        applicationDate: '2025-03-10',
        status: 'Viva Round',
        rounds: [
          { name: 'Application Review', status: 'Completed', date: '2025-03-12' },
          { name: 'Assessment Round', status: 'Completed', date: '2025-03-15' },
          { name: 'Viva Round', status: 'Opened', date: '2025-03-18' }
        ]
      },
      {
        jobId: 2,
        companyName: 'InnoSoft',
        jobRole: 'Data Analyst Intern',
        logo: 'https://via.placeholder.com/50',
        applicationDate: '2025-03-05',
        status: 'Rejected',
        rounds: [
          { name: 'Application Review', status: 'Completed', date: '2025-03-07' },
          { name: 'Assessment Round', status: 'Failed', date: '2025-03-10' }
        ]
      },
      {
        jobId: 3,
        companyName: 'DataWorks',
        jobRole: 'Data Scientist',
        logo: 'https://via.placeholder.com/50',
        applicationDate: '2025-03-01',
        status: 'Offer Received',
        rounds: [
          { name: 'Application Review', status: 'Completed', date: '2025-03-03' },
          { name: 'Assessment Round', status: 'Completed', date: '2025-03-06' },
          { name: 'Viva Round', status: 'Completed', date: '2025-03-09' }
        ]
      }
    ];
    return of(mockAppliedJobs); // Replace with: this.http.get<AppliedJob[]>(`${this.apiUrl}/applied-jobs`);
  }
}