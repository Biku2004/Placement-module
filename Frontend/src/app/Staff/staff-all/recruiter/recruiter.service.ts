// src/app/Staff/services/recruiter.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecruiterService {
  private apiUrl = 'http://localhost:8080/api/recruiters';

  constructor(private http: HttpClient) { }

  getRecruiters(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createRecruiter(recruiter: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, recruiter);
  }

  updateRecruiter(recruiter: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${recruiter.id}`, recruiter);
  }

  deleteRecruiter(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}