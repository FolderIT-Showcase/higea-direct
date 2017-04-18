import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {ApiService} from '../core/service/api.service';
import {User} from '../core/domain/user';

@Injectable()
export class AppAuthService {
  constructor(private api: ApiService) {
  }

  public login(user: User) {
    return this.api.loginPost('login', user)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        user.token = response.headers.get('authorization').slice(7);
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.api.useJwt();
        }
      }).first().toPromise();
  }

  public logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

}
