import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; // updated relative path

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login(this.email, this.password).subscribe({
      next: (res: any) => {
        this.auth.saveToken(res.access_token);
        const role = this.auth.getUser()?.role;
        this.router.navigate([role === 'manager' ? '/manager' : '/employee']);
      },
      error: (err: any) => alert('Invalid credentials'),
    });
  }
}
