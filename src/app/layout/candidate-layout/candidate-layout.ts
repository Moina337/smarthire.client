import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-candidate-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './candidate-layout.html',
  styleUrls: ['./candidate-layout.css']
})
export class CandidateLayout {

  private authService =
    inject(AuthService);

  private router =
    inject(Router);

  logout() {

    this.authService.logout();

    this.router.navigate([
      '/login'
    ]);
  }

}