import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver'; // Add file-saver dependency

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

  // old -----------------
  // getJobPostings(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  // }

  // new ------------
  getJobPostings(batchYear?: string): Observable<any[]> {
    const params = batchYear ? new HttpParams().set('batchYear', batchYear) : undefined;
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders(), params });
  }





  sendJobPostingToStaff(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/send-to-staff`, {}, { headers: this.getHeaders() });
  }

  // createJobPosting(jobPosting: any): Observable<any> {
  //   return this.http.post<any>(this.apiUrl, jobPosting, { headers: this.getHeaders() });
  // }

  // updateJobPosting(jobPosting: any): Observable<any> {
  //   return this.http.put<any>(`${this.apiUrl}/${jobPosting.id}`, jobPosting, { headers: this.getHeaders() });
  // }

  createJobPosting(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData, { headers: this.getHeaders() });
  }

  updateJobPosting(id: number, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, formData, { headers: this.getHeaders() });
  }

  deleteJobPosting(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Add to JobPostingService
  rejectApplication(applicationId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/applications/${applicationId}/reject`, {}, { headers: this.getHeaders() });
  }

  shortlistApplication(applicationId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/applications/${applicationId}/shortlist`, {}, { headers: this.getHeaders() });
  }

  updateRoundStatus(applicationId: number, roundName: string, status: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/applications/${applicationId}/rounds/${roundName}`, null, {
        headers: this.getHeaders(),
        params: { status }
    });
  }



  // Staff Methods
  getAllJobPostings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/staff`, { headers: this.getHeaders() });
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

    // New methods for student applications
    applyToJobPosting(id: number): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/${id}/apply`, {}, { headers: this.getHeaders() });
    }
  
    getMyApplications(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/my-applications`, { headers: this.getHeaders() });
    }
  
    getJobPostingApplications(id: number): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/${id}/applications`, { headers: this.getHeaders() });
    }


    exportJobApplications(jobId: number): Observable<Blob> {
      return this.http.get(`${this.apiUrl}/${jobId}/applications/export`, {
          headers: this.getHeaders(),
          responseType: 'blob'
      });
  }
  
  bulkRejectApplications(applicationIds: number[]): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}/applications/bulk-reject`, applicationIds, { headers: this.getHeaders() });
  }
  
  bulkShortlistApplications(applicationIds: number[]): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}/applications/bulk-shortlist`, applicationIds, { headers: this.getHeaders() });
  }

  setExamDetails(applicationId: number, examLink: string, testScheduledTime: string): Observable<any> {
    const params = { examLink, testScheduledTime };
    return this.http.put<any>(`${this.apiUrl}/applications/${applicationId}/exam`, null, {
        headers: this.getHeaders(),
        params
    });
  }

  // job-posting.service.ts
  hideJobPosting(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/hide`, {}, { headers: this.getHeaders() });
  }

  // getArchivedJobPostings(archiveYear: string): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/archived/${archiveYear}`, { headers: this.getHeaders() });
  // }

  getBatchYears(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/batch-years`, { headers: this.getHeaders() });
  }

  // archiveJobPosting(id: number, archiveYear: string): Observable<any> {
  //   return this.http.put<any>(`${this.apiUrl}/${id}/archive`, null, {
  //       headers: this.getHeaders(),
  //       params: { archiveYear }
  //   });
  // }

  unhideJobPosting(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/unhide`, {}, { headers: this.getHeaders() });
  }

  // unarchiveJobPosting(id: number): Observable<any> {
  //   return this.http.put<any>(`${this.apiUrl}/${id}/unarchive`, {}, { headers: this.getHeaders() });
  // }




}