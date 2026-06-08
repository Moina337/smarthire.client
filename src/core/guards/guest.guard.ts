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
export class GuestGuard implements CanMatch, CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  private redirectLoggedUser(): boolean | UrlTree {
    if (!this.authService.isLoggedIn()) {
      return true;
    }

    const redirect = this.authService.redirectAfterLogin();
    return this.router.parseUrl(redirect);
  }

  canMatch(route: Route, segments: UrlSegment[]) {
    return this.redirectLoggedUser();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.redirectLoggedUser();
  }
}
