import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl =
    environment.apiUrl;

  authState = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(
    private http: HttpClient
  ) {}

  login(data: any) {

    return this.http.post(
      `${this.baseUrl}/auth/login`,
      data
    );
  }

  register(data: any) {

    return this.http.post(
      `${this.baseUrl}/auth/register`,
      data
    );
  }

  saveToken(token: string) {

    if (typeof window === 'undefined' || !('localStorage' in window)) return;
    try {
      localStorage.setItem('token', token);
      this.authState.next(true);
    } catch {
      // ignore storage errors (SSR or quota)
    }
  }

  loginWithGoogle() {
    if (typeof window === 'undefined') return;
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  }

  getToken() {

    if (typeof window === 'undefined' || !('localStorage' in window)) return null;
    try {
      return localStorage.getItem('token');
    } catch {
      return null;
    }
  }

  logout() {

    if (typeof window === 'undefined' || !('localStorage' in window)) return;
    try {
      localStorage.removeItem('token');
      this.authState.next(false);
    } catch {
      // ignore
    }
  }

  private parseJwt(token: string) {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decodeURIComponent(
        decoded
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      ));
    } catch {
      return null;
    }
  }

  getUserRole() {
    const token = this.getToken();
    if (!token) return null;
    const payload = this.parseJwt(token);
    if (!payload) return null;
    if (payload.role) return payload.role;
    if (payload.roles?.length) return payload.roles[0];
    if (payload.authorities?.length) return payload.authorities[0];
    return null;
  }

  redirectAfterLogin() {
    const role = this.getUserRole();
    if (role?.toString().toLowerCase().includes('admin')) {
      return '/admin';
    }
    return '/candidate/profile';
  }

  isLoggedIn() {

    return !!this.getToken();
  }

}