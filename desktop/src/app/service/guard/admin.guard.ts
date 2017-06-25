import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AppAuthService} from '../../module/auth/auth.service';
import {Util} from '../utils.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    if (AppAuthService.isAdmin() && Util.getWidth() >= 900) return true;
    this.router.navigate(['/']);
    return false;
  }
}
