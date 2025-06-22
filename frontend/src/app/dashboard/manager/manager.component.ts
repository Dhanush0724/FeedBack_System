// src/app/dashboard/manager/manager.component.ts
import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { ChartData, ChartConfiguration, ChartType } from 'chart.js';
import { ManagerFeedbackComponent } from '../../feedback/manager-feedback/manager-feedback.component';

interface Feedback {
  id: number;
  employee_id: number;
  strengths: string;
  improvements: string;
  sentiment: string;
  created_at: string;
}

@Component({
  standalone: true,
  selector: 'app-manager-dashboard',
  imports: [CommonModule, FormsModule, NgChartsModule, ManagerFeedbackComponent],
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent {
  private http = inject(HttpClient);

  feedbackList = signal<Feedback[]>([]);
  selectedFeedback = signal<Feedback | null>(null);

  editedStrengths = '';
  editedImprovements = '';
  editedSentiment = 'positive';

  

  constructor() {
    this.fetchFeedbacks();
  }

  fetchFeedbacks() {
    const token = localStorage.getItem('token');
    this.http.get<Feedback[]>('http://localhost:8000/feedback/manager', {
      headers: { Authorization: `Bearer ${token}` },
    }).subscribe(data => this.feedbackList.set(data));
  }

  selectFeedback(fb: Feedback) {
    this.selectedFeedback.set(fb);
    this.editedStrengths = fb.strengths;
    this.editedImprovements = fb.improvements;
    this.editedSentiment = fb.sentiment;
  }

  saveEdits() {
    const fb = this.selectedFeedback();
    const token = localStorage.getItem('token');
    if (!fb) return;

    this.http.put(`http://localhost:8000/feedback/${fb.id}`, {
      strengths: this.editedStrengths,
      improvements: this.editedImprovements,
      sentiment: this.editedSentiment
    }, {
      headers: { Authorization: `Bearer ${token}` },
    }).subscribe(() => {
      this.fetchFeedbacks();
      this.selectedFeedback.set(null);
    });
  }

  cancelEdit() {
    this.selectedFeedback.set(null);
  }

  deleteFeedback(id: number) {
    const token = localStorage.getItem('token');
    this.http.delete(`http://localhost:8000/feedback/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).subscribe(() => this.fetchFeedbacks());
  }
}
