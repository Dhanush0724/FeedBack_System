import { Component } from '@angular/core';

@Component({
  selector: 'app-feedback',
  imports: [],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {
form = {
    employee_id: '',
    strengths: '',
    improvements: '',
    sentiment: 'positive'
};
constructor(private api: ApiService) {}

  submit() {
    this.api.post('/feedback/', this.form).subscribe({
      next: () => alert('Feedback submitted'),
      error: () => alert('Error submitting')
    });
  }
}
