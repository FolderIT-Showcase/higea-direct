import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {ApiService} from '../core/service/api.service';
import {User} from '../core/domain/user';
import {StoreService} from '../core/service/store.service';
import {Router} from '@angular/router';

@Injectable()
export class AppAuthService {
  constructor(private api: ApiService,
              private storeService: StoreService,
              private router: Router) {
  }

  public login(user: User, type: string = '') {

    switch (type) {
      case 'facebook' :
      case 'google' :
        this.getUser(type, user.externalId)
          .then(() => {
            // login exitoso rutear a la pagina principal
            this.normalLogin(user, type);
          })
          .catch(() => {
            // el usuario no existe, registrarlo
            localStorage.setItem('socialUser', JSON.stringify(user));
            this.router.navigate(['/register-social']);
          });
        return;
      default :
        return this.normalLogin(user);
    }

  }

  public logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.api.removeJwt();
    this.router.navigate(['/']);
  }

  public getUser(type: string, id: string) {
    const path = 'user/external';
    const params: URLSearchParams = new URLSearchParams();
    params.set('type', type);
    params.set('externalId', id);
    return this.api.get(path, params).first().toPromise();
  }

  normalLogin(user: User, type: string = '') {
    const path = 'login';
    return this.api.loginPost(path, user)
      .map((response: Response) => {
        user.token = response.headers.get('authorization').slice(7);
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.api.useJwt();
        }
      }).first().toPromise()
      .then(() => {
        this.router.navigate(['/']);
      });
  }

}
