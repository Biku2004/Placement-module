
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class JobService {
//   private apiUrl = 'http://localhost:8080/api/jobs';

//   constructor(private http: HttpClient) { }

//   getJobPosts(): Observable<any[]> {
//     return this.http.get<any[]>(this.apiUrl);
//   }

//   createJobPost(jobPost: any): Observable<any> {
//     return this.http.post<any>(this.apiUrl, jobPost);
//   }
// }

// src/app/services/job.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from './models/company';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'http://localhost:8080/api/jobs';

  constructor(private http: HttpClient) { }

  getJobPosts(): Observable<any[]> {
    const token = localStorage.getItem('jwt'); // Ensure the token key matches the one used in login
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  createJobPost(jobPost: any): Observable<any> {
    const token = localStorage.getItem('jwt'); // Ensure the token key matches the one used in login
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(this.apiUrl, jobPost, { headers });
  }

  updateJobPost(jobPost: any): Observable<any> {
    const token = localStorage.getItem('jwt'); // Ensure the token key matches the one used in login
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any>(`${this.apiUrl}/${jobPost.id}`, jobPost, { headers });
  }

  deleteJobPost(id: number): Observable<any> {
    const token = localStorage.getItem('jwt'); // Ensure the token key matches the one used in login
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
  }

  sendJobPostToStudents(id: number): Observable<any> {
    const token = localStorage.getItem('jwt'); // Ensure the token key matches the one used in login
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.apiUrl}/${id}/send`, {}, { headers });
  }



}