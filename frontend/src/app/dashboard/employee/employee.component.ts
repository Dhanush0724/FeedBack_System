import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Feedback {
  id: number;
  employee_id: number;
  strengths: string;
  improvements: string;
  sentiment: string;
  created_at: string;
  acknowledged: boolean;
}

interface Employee {
  id: number;
  name: string;
}

@Component({
  standalone: true,
  selector: 'app-employee-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  private http = inject(HttpClient);

  employee = signal<Employee | null>(null);  // ✅ to hold employee info
  activeFeedbackId = signal<number | null>(null);
  feedbackList = signal<Feedback[]>([]);
  sentimentFilter = signal<string>('all');

  constructor() {
    this.fetchEmployeeInfo();
    this.fetchFeedbacks();
  }

  get employeeInfo() {
    return this.employee();
  }

  private getToken(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  }

  fetchEmployeeInfo() {
    const token = this.getToken();
    if (!token) return;

    this.http.get<Employee>('http://localhost:8000/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    }).subscribe({
      next: data => this.employee.set(data),
      error: err => console.error('Failed to fetch employee info:', err)
    });
  }

  fetchFeedbacks() {
    const token = this.getToken();
    if (!token) return;

    this.http.get<Feedback[]>('http://localhost:8000/feedback/my', {
      headers: { Authorization: `Bearer ${token}` },
    }).subscribe({
      next: data => this.feedbackList.set(data),
      error: err => console.error('Failed to fetch feedbacks:', err)
    });
  }

  acknowledgeFeedback(fbId: number) {
    const token = this.getToken();
    if (!token) return;

    this.http.post(`http://localhost:8000/feedback/${fbId}/acknowledge`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    }).subscribe({
      next: () => this.fetchFeedbacks(),
      error: err => console.error('Acknowledgement failed:', err)
    });
  }

  filteredFeedbacks = computed(() => {
    const allFeedback = this.feedbackList();
    const filter = this.sentimentFilter();

    if (filter === 'all') return allFeedback;
    return allFeedback.filter(fb => fb.sentiment === filter);
  });
}
