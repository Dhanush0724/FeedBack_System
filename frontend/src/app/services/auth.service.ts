import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
  const body = new URLSearchParams();
  body.set('username', email);  // OAuth2 expects 'username'
  body.set('password', password);

  return this.http.post(`${this.api}/auth/login`, body.toString(), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
}


  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser() {
    const token = this.getToken();
    if (!token) return null;
    return jwtDecode<any>(token);
  }

  logout() {
    localStorage.removeItem('token');
  }

  isManager(): boolean {
    return this.getUser()?.role === 'manager';
  }

  isEmployee(): boolean {
    return this.getUser()?.role === 'employee';
  }
}
