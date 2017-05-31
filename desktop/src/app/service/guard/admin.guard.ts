import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AppAuthService} from '../../module/auth/auth.service';
import {UtilsService} from '../utils.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private utilsService: UtilsService) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    if (AppAuthService.isAdmin() && this.utilsService.getWidth() >= 900) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
