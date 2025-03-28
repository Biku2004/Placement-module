// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Job } from './student-profile/job';
// import { Application } from './student-profile/application';
// import { AppliedJob } from './student-profile/applied-job';

// @Injectable({
//   providedIn: 'root'
// })
// export class GiveJobsToStudentService {
//   private apiUrl = 'http://final-env.eba-gkf934kn.ap-south-1.elasticbeanstalk.com/api/student/jobs'; // Updated to student-specific endpoint

//   constructor(private http: HttpClient) {}

//   private getHeaders(): HttpHeaders {
//     const token = localStorage.getItem('jwt');
//     console.log('JWT Token:', token); // Log token in browser console
//     return new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     });
//   }

//   // Fetch all SENT job postings for students
//   getJobs(): Observable<Job[]> {
//     return this.http.get<Job[]>(this.apiUrl, { headers: this.getHeaders() });
//   }
  
// }