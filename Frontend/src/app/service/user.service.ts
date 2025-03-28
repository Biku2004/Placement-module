import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface UserDetails {
  name: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/login';

  constructor(private http: HttpClient) { }

  getUserDetails(): Observable<UserDetails> {
    const token = localStorage.getItem('jwt'); // Ensure the token key matches the one used in login
    const name = localStorage.getItem('name'); // Retrieve the name from localStorage
    const role = localStorage.getItem('role'); // Retrieve the role from localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Name': name || '', // Include the name in the headers
      'Role': role || '' // Include the role in the headers
    });
    return this.http.get<UserDetails>(this.apiUrl, { headers });
  }
}