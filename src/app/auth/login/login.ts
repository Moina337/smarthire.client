import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

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
    , private activatedRoute: ActivatedRoute
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

          const redirect =
            this.activatedRoute.snapshot
              .queryParamMap.get('redirect');

          this.router.navigate([
            redirect || this.authService.redirectAfterLogin()
          ]);
        },

        error: err => {
          console.log(err);
        }

      });
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }
}
