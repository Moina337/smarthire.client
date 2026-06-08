import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanMatch,
  Router,
  Route,
  UrlSegment,
  UrlTree,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanMatch, CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  private checkAdmin(url: string): boolean | UrlTree {
    if (!this.authService.isLoggedIn()) {
      return this.router.parseUrl(`/login?redirect=${encodeURIComponent(url)}`);
    }

    const role = this.authService.getUserRole();
    if (role?.toString().toLowerCase().includes('admin')) {
      return true;
    }

    return this.router.parseUrl('/');
  }

  canMatch(route: Route, segments: UrlSegment[]) {
    const url = '/' + segments.map(s => s.path).join('/');
    return this.checkAdmin(url);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.checkAdmin(state.url);
  }
}