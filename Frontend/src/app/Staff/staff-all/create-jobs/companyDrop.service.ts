import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from './models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyDropService {
  private apiUrl = 'http://final-env.eba-gkf934kn.ap-south-1.elasticbeanstalk.com/api/companies';

  constructor(private http: HttpClient) {}

  getCompanies(): Observable<Company[]> {
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Company[]>(this.apiUrl, { headers });
  }
}