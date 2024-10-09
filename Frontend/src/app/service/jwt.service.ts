// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class JwtService {

//   constructor() { }
// }


import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const BASE_URL = 'http://localhost:8080'; // Adjust the base URL as necessary

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private http: HttpClient) {}

  register(signRequest: any): Observable<any> {
    return this.http.post(`${BASE_URL}/signup`, signRequest);
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post(`${BASE_URL}/login`, loginRequest);
  }

  hello(): Observable<any> {
    const headers = this.createAuthorizationHeader() || new HttpHeaders();
    return this.http.get(`${BASE_URL}/api/hello`,{ headers });
  }

  private createAuthorizationHeader(): HttpHeaders | null {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      console.log("JWT token found in local storage", jwtToken);
      return new HttpHeaders().set("Authorization", `Bearer ${jwtToken}`);
    } else {
      console.log("JWT token not found in local storage");
    }
    return null;
  }
}