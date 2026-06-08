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
export class AuthGuard implements CanMatch, CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  private ensureAuthenticated(
    url: string
  ): boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    return this.router.parseUrl(`/login?redirect=${encodeURIComponent(url)}`);
  }

  canMatch(route: Route, segments: UrlSegment[]) {
    const url = '/' + segments.map(s => s.path).join('/');
    return this.ensureAuthenticated(url);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.ensureAuthenticated(state.url);
  }
}