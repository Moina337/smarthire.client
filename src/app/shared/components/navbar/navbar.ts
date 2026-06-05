import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {

  private authService = inject(AuthService) as AuthService;
  private router = inject(Router);

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  get isLogged() {
    return this.authService.isLoggedIn();
  }

  get isAdmin() {
    const role = this.authService.getUserRole();
    return !!role && role.toString().toLowerCase().includes('admin');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}