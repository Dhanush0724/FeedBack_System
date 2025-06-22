import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-manager-feedback',
  imports: [CommonModule, FormsModule],
  templateUrl: './manager-feedback.component.html'
})
export class ManagerFeedbackComponent {
  private http = inject(HttpClient);
  private router = inject(Router);

  employee_id: number = 0;
  strengths: string = '';
  improvements: string = '';
  sentiment: string = 'positive';

  feedbackSuccess = false;
  feedbackError = false;

  submitFeedback() {
    const token = localStorage.getItem('token');
    this.http.post('http://localhost:8000/feedback/', {
      employee_id: this.employee_id,
      strengths: this.strengths,
      improvements: this.improvements,
      sentiment: this.sentiment,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).subscribe({
      next: () => {
        this.feedbackSuccess = true;
        this.feedbackError = false;
        this.strengths = '';
        this.improvements = '';
        this.sentiment = 'positive';
      },
      error: () => {
        this.feedbackSuccess = false;
        this.feedbackError = true;
      }
    });
  }
}
