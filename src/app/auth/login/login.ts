import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {

    const data = {

      email: this.email,
      password: this.password

    };

    this.authService
      .login(data)
      .subscribe({

        next: (res: any) => {

          this.authService
            .saveToken(res.token);

          this.router.navigate(['/candidate/profile']);
        },

        error: err => {
          console.log(err);
        }

      });
  }
}