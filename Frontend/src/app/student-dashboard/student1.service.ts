import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of , forkJoin } from 'rxjs';
import { StudentProfile } from './student-profile/student-profile';
import { Job } from './student-profile/job';
import { Application } from './student-profile/application';
import { AppliedJob } from './student-profile/applied-job';
// import { Observable,  } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class StudentService1 {
  private apiUrl = 'http://final-env.eba-gkf934kn.ap-south-1.elasticbeanstalk.com/api/jobs';
  // private recruiterApiUrl = 'http://final-env.eba-gkf934kn.ap-south-1.elasticbeanstalk.com/api/recruiter/jobs';
  // private staffApiUrl = 'http://final-env.eba-gkf934kn.ap-south-1.elasticbeanstalk.com/api/jobs';


  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/staff/approved/jobs`, { headers: this.getHeaders() });
  }

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

  applyToJob(jobId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${jobId}/apply`, {}, { headers: this.getHeaders() });
  }

  getAppliedJobs(batchYear?: string): Observable<any[]> {
    const params = batchYear ? new HttpParams().set('batchYear', batchYear) : undefined;
    return this.http.get<any[]>(`${this.apiUrl}/my-applications`, { headers: this.getHeaders(), params });
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



  deregisterFromJobPosting(jobPostId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${jobPostId}/deregister`, { headers: this.getHeaders() });
  }

  getBatchYears(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/batch-years`, { headers: this.getHeaders() });
  }

}