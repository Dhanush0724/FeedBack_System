import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ManagerFeedbackComponent } from '../../feedback/manager-feedback/manager-feedback.component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
interface Feedback {
  id: number;
  employee_id: number;
  strengths: string;
  improvements: string;
  sentiment: string;
  created_at: string;
  acknowledged: boolean;
}

interface TeamSummary {
  employee_id: number;
  employee_name: string;
  total_feedbacks: number;
  sentiments: {
    positive: number;
    neutral: number;
    negative: number;
  };
}



@Component({
  standalone: true,
  selector: 'app-manager-dashboard',
  imports: [CommonModule, FormsModule, ManagerFeedbackComponent],
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent {
  private http = inject(HttpClient);

  feedbackList = signal<Feedback[]>([]);
  selectedFeedback = signal<Feedback | null>(null);
  teamSummary = signal<TeamSummary[]>([]);
  editedStrengths = '';
  editedImprovements = '';
  editedSentiment = 'positive';
 

  constructor() {
    this.fetchFeedbacks();
    this.fetchTeamSummary();
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

  fetchTeamSummary() {
    const token = this.getToken();
    if (!token) return;
    this.http.get<TeamSummary[]>('http://localhost:8000/feedback/manager/team-feedback-summary', {
      headers: { Authorization: `Bearer ${token}` },
    }).subscribe({
      next: data => this.teamSummary.set(data),
      error: err => console.error('Failed to fetch team summary:', err)
    });
  }

  selectFeedback(fb: Feedback) {
    this.selectedFeedback.set(fb);
    this.editedStrengths = fb.strengths;
    this.editedImprovements = fb.improvements;
    this.editedSentiment = fb.sentiment;
  }

  saveEdits() {
    const fb = this.selectedFeedback();
    const token = this.getToken();
    if (!fb || !token) return;

    this.http.put(`http://localhost:8000/feedback/${fb.id}`, {
      employee_id: fb.employee_id,
      strengths: this.editedStrengths,
      improvements: this.editedImprovements,
      sentiment: this.editedSentiment
    }, {
      headers: { Authorization: `Bearer ${token}` },
    }).subscribe({
      next: () => {
        this.fetchFeedbacks();
        this.selectedFeedback.set(null);
      },
      error: err => console.error('Failed to update feedback:', err)
    });
  }

  cancelEdit() {
    this.selectedFeedback.set(null);
  }

  deleteFeedback(id: number) {
    const token = this.getToken();
    if (!token) return;

    this.http.delete(`http://localhost:8000/feedback/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).subscribe({
      next: () => this.fetchFeedbacks(),
      error: err => console.error('Failed to delete feedback:', err)
    });
  }
downloadFeedbackAsPDF() {
  const content = document.getElementById('feedbackContentToDownload');
  if (!content) return;

  html2canvas(content).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('feedback-report.pdf');
  });
}
  
}
