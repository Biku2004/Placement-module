import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobPostingService {
  private apiUrl = 'http://localhost:8080/api/recruiter/jobs';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  // getJobPostings(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  // }

  sendJobPostingToStaff(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/send-to-staff`, {}, { headers: this.getHeaders() });
  }

  createJobPosting(jobPosting: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, jobPosting, { headers: this.getHeaders() });
  }

  updateJobPosting(jobPosting: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${jobPosting.id}`, jobPosting, { headers: this.getHeaders() });
  }

  deleteJobPosting(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }



    // Staff Methods
    getAllJobPostings(): Observable<any[]> {
      return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
    }
  
    approveJobPosting(id: number): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}/${id}/approve`, {}, { headers: this.getHeaders() });
    }
  
    rejectJobPosting(id: number): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}/${id}/reject`, {}, { headers: this.getHeaders() });
    }
  
    sendJobPostingToStudents(id: number): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/${id}/send-to-students`, {}, { headers: this.getHeaders() });
    }

}