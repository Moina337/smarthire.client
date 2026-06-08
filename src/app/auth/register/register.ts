import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service'; 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {

  nom = '';
  email = '';
  password = '';

  loading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {

    this.loading = true;
    this.errorMessage = '';

    const data = {

      nom: this.nom,
      email: this.email,
      password: this.password

    };

    this.authService
      .register(data)
      .subscribe({

        next: (res: any) => {

          this.authService
            .saveToken(res.token);

          // Redirection vers création de profil candidat
          this.router.navigate([
            '/candidate/create'
          ]);

        },

        error: (err) => {

          console.log(err);

          this.errorMessage =
            'Inscription impossible';

          this.loading = false;
        },

        complete: () => {

          this.loading = false;
        }

      });
  }

}