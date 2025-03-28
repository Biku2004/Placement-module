// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class RecruiterService {
//   private apiUrl = 'http://final-env.eba-gkf934kn.ap-south-1.elasticbeanstalk.com/api/recruiter';

//   constructor(private http: HttpClient) {}

//   register(recruiter: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/register`, recruiter);
//   }

//   createJob(job: any, pdf: File, recruiterId: number): Observable<any> {
//     const formData = new FormData();
//     formData.append('job', new Blob([JSON.stringify(job)], { type: 'application/json' }));
//     if (pdf) formData.append('pdf', pdf);
//     return this.http.post(`${this.apiUrl}/jobs?recruiterId=${recruiterId}`, formData);
//   }

//   searchStudents(filters: any): Observable<any> {
//     return this.http.get(`${this.apiUrl}/students/search`, { params: filters });
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://final-env.eba-gkf934kn.ap-south-1.elasticbeanstalk.com/api/recruiter';

@Injectable({
  providedIn: 'root',
})
export class RecruiterService {
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  createJob(job: any, pdf: File | null, recruiterId: string): Observable<any> {
    const formData = new FormData();
    formData.append('job', new Blob([JSON.stringify(job)], { type: 'application/json' }));
    if (pdf) formData.append('pdf', pdf);
    return this.http.post(`${BASE_URL}/jobs?recruiterId=${recruiterId}`, formData, { headers: this.getHeaders() });
  }

  getJobs(recruiterId: string): Observable<any> {
    return this.http.get(`${BASE_URL}/jobs?recruiterId=${recruiterId}`, { headers: this.getHeaders() });
  }

  deleteJob(id: number): Observable<any> {
    return this.http.delete(`${BASE_URL}/jobs/${id}`, { headers: this.getHeaders() });
  }

  searchStudents(filters: any): Observable<any> {
    return this.http.get(`${BASE_URL}/students/search`, { headers: this.getHeaders(), params: filters });
  }

  shortlistStudent(studentId: number, recruiterId: string): Observable<any> {
    return this.http.post(`${BASE_URL}/students/shortlist/${studentId}?recruiterId=${recruiterId}`, {}, { headers: this.getHeaders() });
  }

  scheduleInterview(interview: any, recruiterId: string): Observable<any> {
    return this.http.post(`${BASE_URL}/interviews?recruiterId=${recruiterId}`, interview, { headers: this.getHeaders() });
  }

  getAnalytics(recruiterId: string): Observable<any> {
    return this.http.get(`${BASE_URL}/analytics?recruiterId=${recruiterId}`, { headers: this.getHeaders() });
  }

  sendMessage(recruiterEmail: string, message: string): Observable<any> {
    return this.http.post(`${BASE_URL}/communication/message?recruiterEmail=${recruiterEmail}`, message, { headers: this.getHeaders() });
  }
}