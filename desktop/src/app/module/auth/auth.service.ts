import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {ApiService} from '../../service/api.service';
import {User} from '../../domain/user';
import {Router} from '@angular/router';

@Injectable()
export class AppAuthService {

  basePath = 'core/';

  static getRole(): string {
    const user: User = JSON.parse(localStorage.getItem('currentUser'));
    if (!user || !user.roles) {
      return 'ROLE_USER';
    }
    const role = user.roles[0].authority;
    if (role) {
      return role;
    }
    return 'ROLE_USER'
  }

  static isAdmin() {
    const role: string = AppAuthService.getRole();
    return role === 'ROLE_ADMIN';
  }

  constructor(private api: ApiService, private router: Router) {
  }

  public login(user: User, type: string = '') {
    if (type === 'social') {
      return this.normalLogin(user).catch(() => this.router.navigate(['/auth/register-social']));
    }
    return this.normalLogin(user);
  }

  public logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.api.removeJwt();
    return this.router.navigate(['/auth/login']);
  }

  normalLogin(user: User, type: string = '') {
    const path = `${this.basePath}login`;
    return this.api
      .loginPost(path, user)
      .then(() => this.router.navigate(['/']));
  }

}
