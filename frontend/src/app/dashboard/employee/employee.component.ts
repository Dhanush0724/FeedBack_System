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

@Component({
  standalone: true,
  selector: 'app-employee-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  private http = inject(HttpClient);

  activeFeedbackId = signal<number | null>(null);
  feedbackList = signal<Feedback[]>([]);
  sentimentFilter = signal<string>('all');

  constructor() {
    this.fetchFeedbacks();
  }

  private getToken(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
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
