
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class CompanyService {
//   private apiUrl = 'http://localhost:8080/api/companies';

//   constructor(private http: HttpClient) { }

//   getCompanies(): Observable<any[]> {
//     return this.http.get<any[]>(this.apiUrl);
//   }

//   createCompany(company: any): Observable<any> {
//     return this.http.post<any>(this.apiUrl, company);
//   }

//   updateCompany(company: any): Observable<any> {
//     return this.http.put<any>(`${this.apiUrl}/${company.id}`, company);
//   }

//   deleteCompany(id: number): Observable<any> {
//     return this.http.delete<any>(`${this.apiUrl}/${id}`);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = 'http://localhost:8080/api/companies';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getCompanies(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  createCompany(company: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, company, { headers: this.getHeaders() });
  }

  updateCompany(company: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${company.id}`, company, { headers: this.getHeaders() });
  }

  deleteCompany(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}