import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = 'http://localhost:8000';

  constructor(private http: HttpClient, private auth: AuthService) {}

  get<T>(url: string) {
    return this.http.get<T>(`${this.base}${url}`, { headers: this.getHeaders() });
  }

  post<T>(url: string, data: any) {
    return this.http.post<T>(`${this.base}${url}`, data, { headers: this.getHeaders() });
  }

  private getHeaders() {
    return {
      Authorization: `Bearer ${this.auth.getToken()}`,
    };
  }
}
