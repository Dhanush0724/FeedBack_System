import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-employee',
  standalone: true,  // Required for standalone component
  imports: [HttpClientModule],  // Import HttpClientModule here
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']  // Typo fixed: styleUrl → styleUrls
})
export class EmployeeComponent {
  constructor(private http: HttpClient) {}

  acknowledge(feedbackId: number) {
    const token = localStorage.getItem('token');
    this.http.post(`http://localhost:8000/feedback/${feedbackId}/acknowledge`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => alert('✅ Acknowledged!'),
      error: () => alert('⚠️ Already acknowledged or error occurred.')
    });
  }
}
