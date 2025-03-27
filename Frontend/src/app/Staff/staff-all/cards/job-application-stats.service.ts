import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface JobApplicationStatsService {
  totalApplications: number;
  interviewsAttended: number;
  interviewPercentage: number;
  offersReceived: number;
  rejectedOffers: number;
}

@Injectable({
  providedIn: 'root' // Singleton service available app-wide
})
export class JobApplicationStatsService {
  private apiUrl = 'http://localhost:8080/api/data/stats'; // Direct backend URL

  constructor(private http: HttpClient) {}

  getStats(): Observable<JobApplicationStatsService> {
    return this.http.get<JobApplicationStatsService>(this.apiUrl);
  }
}