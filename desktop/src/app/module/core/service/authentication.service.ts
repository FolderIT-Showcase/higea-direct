import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {ApiService} from './api.service';
import {Router} from '@angular/router';
import {AlertService} from './alert.service';
import {User} from '../domain/user';

@Injectable()
export class AuthenticationService {
  constructor(private api: ApiService,
              private router: Router,
              private alertService: AlertService) {
  }

  login(user: User) {
    return this.api.loginPost('login', user)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        const token = response.headers.get('authorization').slice(7);
        user.token = token;
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.api.useJwt();
        }
      }).first().toPromise();
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
