import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AppAuthService} from '../../../auth/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    if (AppAuthService.isAdmin()) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
