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
    if (!user || !user.roles) return 'ROLE_USER';
    const role = user.roles[0].authority;
    if (role) return role;
    return 'ROLE_USER'
  }

  static isAdmin() {
    return AppAuthService.getRole() === 'ROLE_ADMIN';
  }

  constructor(private api: ApiService, private router: Router) {
  }

  public login(user) {
    user = {
      email: user.email,
      password: user.password
    };
    const path = `${this.basePath}login`;
    return this.api.post(path, user, false)
      .then(response => {
        console.log(response);
        user.token = response.headers.get('authorization').slice(7);
        if (user && user.token) localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.log('hey 500');
        const socialuser = JSON.parse(localStorage.getItem('socialUser'));
        if (socialuser) this.router.navigate(['/auth/register-social']);
      });

  }

  public logout() {
    // remove user from local storage to log user out
    localStorage.clear();
    this.api.removeJwt();
    return this.router.navigate(['/auth/login']);
  }

}
