
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from './models/company';

@Injectable({
  providedIn: 'root'
})
// export class JobService {
//   private apiUrl = 'http://localhost:8080/api/jobs';

//   constructor(private http: HttpClient) { }

//   getJobPosts(): Observable<any[]> {
//     const token = localStorage.getItem('jwt'); // Ensure the token key matches the one used in login
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${token}`
//     });
//     return this.http.get<any[]>(this.apiUrl, { headers });
//   }

//   createJobPost(jobPost: any): Observable<any> {
//     const token = localStorage.getItem('jwt'); // Ensure the token key matches the one used in login
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${token}`
//     });
//     return this.http.post<any>(this.apiUrl, jobPost, { headers });
//   }

//   updateJobPost(jobPost: any): Observable<any> {
//     const token = localStorage.getItem('jwt'); // Ensure the token key matches the one used in login
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${token}`
//     });
//     return this.http.put<any>(`${this.apiUrl}/${jobPost.id}`, jobPost, { headers });
//   }

//   deleteJobPost(id: number): Observable<any> {
//     const token = localStorage.getItem('jwt'); // Ensure the token key matches the one used in login
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${token}`
//     });
//     return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
//   }

//   sendJobPostToStudents(id: number): Observable<any> {
//     const token = localStorage.getItem('jwt'); // Ensure the token key matches the one used in login
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${token}`
//     });
//     return this.http.post<any>(`${this.apiUrl}/${id}/send`, {}, { headers });
//   }



// }

export class JobService {
  private apiUrl = 'http://localhost:8080/api/jobs';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders({
        'Authorization': `Bearer ${token}`
    });
  }

    getJobPosts(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/staff/created/jobs`, { headers: this.getHeaders() });
    }

    createJobPost(formData: FormData): Observable<any> {
        return this.http.post<any>(this.apiUrl, formData, { headers: this.getHeaders() });
    }

    updateJobPost(jobPost: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${jobPost.id}`, jobPost, { headers: this.getHeaders() });
    }

    deleteJobPost(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
    }

    sendJobPostToStudents(id: number): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/${id}/send-to-students`, {}, { headers: this.getHeaders() });
    }

    getJobPostApplications(id: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/${id}/applications`, { headers: this.getHeaders() });
    }

    shortlistApplication(applicationId: number): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/applications/${applicationId}/shortlist`, {}, { headers: this.getHeaders() });
    }

    rejectApplication(applicationId: number): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/applications/${applicationId}/reject`, {}, { headers: this.getHeaders() });
    }

    updateRoundStatus(applicationId: number, roundName: string, status: string): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/applications/${applicationId}/rounds/${roundName}`, null, {
            headers: this.getHeaders(),
            params: { status }
        });
    }

    exportJobApplications(jobId: number): Observable<Blob> {
        return this.http.get(`${this.apiUrl}/${jobId}/applications/export`, {
            headers: this.getHeaders(),
            responseType: 'blob'
        });
    }

    setExamDetails(applicationId: number, examLink: string, testScheduledTime: string): Observable<any> {
        const params = { examLink, testScheduledTime };
        return this.http.put<any>(`${this.apiUrl}/applications/${applicationId}/exam`, null, {
            headers: this.getHeaders(),
            params
        });
    }
}