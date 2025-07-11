import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; 

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
  this.auth.login(this.email, this.password).subscribe({
    next: (res: any) => {
      this.auth.saveToken(res.access_token, res.user); 
      const role = res.user.role?.toLowerCase(); 
      this.router.navigate([role === 'manager' ? '/manager' : '/employee']);
    },
    error: (err: any) => alert('Invalid credentials'),
  });
}

}
