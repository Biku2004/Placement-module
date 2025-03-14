// // import { Injectable } from '@angular/core';

// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class JwtService {

// //   constructor() { }
// // }


// import { HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { HttpClient } from '@angular/common/http';

// const BASE_URL = 'http://localhost:8080'; // Adjust the base URL as necessary

// @Injectable({
//   providedIn: 'root'
// })
// export class JwtService {

//   constructor(private http: HttpClient) {}

//   register(signRequest: any): Observable<any> {
//     return this.http.post(`${BASE_URL}/signup`, signRequest);
//   }

//   login(loginRequest: any): Observable<any> {
//     return this.http.post(`${BASE_URL}/login`, loginRequest);
//   }

//   hello(): Observable<any> {
//     const headers = this.createAuthorizationHeader() || new HttpHeaders();
//     return this.http.get(`${BASE_URL}/api/hello`,{ headers });
//   }

//   private createAuthorizationHeader(): HttpHeaders | null {
//     const jwtToken = localStorage.getItem('jwt');
//     if (jwtToken) {
//       console.log("JWT token found in local storage", jwtToken);
//       return new HttpHeaders().set("Authorization", `Bearer ${jwtToken}`);
//     } else {
//       console.log("JWT token not found in local storage");
//     }
//     return null;
//   }
// }


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8080';

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
    return this.http.get(`${BASE_URL}/api/hello`, { headers });
  }

  getProfile(): Observable<any> {
    const headers = this.createAuthorizationHeader() || new HttpHeaders();
    return this.http.get(`${BASE_URL}/api/profile`, { headers });
  }

  updateProfile(formData: FormData): Observable<any> {
    const headers = this.createAuthorizationHeader() || new HttpHeaders();
    return this.http.post(`${BASE_URL}/api/profile`, formData, { headers });
  }

  getProfileImage(): Observable<Blob> {
    const headers = this.createAuthorizationHeader() || new HttpHeaders();
    return this.http.get(`${BASE_URL}/api/profile/image`, { headers, responseType: 'blob' });
  }

  private createAuthorizationHeader(): HttpHeaders | null {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      return new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
    }
    return null;
  }

  getUserDetails(): { name: string; role: string; email: string } | null {
    const jwtToken = localStorage.getItem('jwt');
    if (!jwtToken) return null;
    const payload = jwtToken.split('.')[1];
    const decodedPayload = atob(payload);
    const parsedPayload = JSON.parse(decodedPayload);
    return {
      name: parsedPayload.name || '',
      role: parsedPayload.role || '',
      email: parsedPayload.sub || parsedPayload.email || ''
    };
  }

  logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    localStorage.removeItem('profilePhoto');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt');
  }
}