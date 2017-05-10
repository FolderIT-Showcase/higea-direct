import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {ApiService} from '../core/service/api.service';
import {User} from '../core/domain/user';
import {StoreService} from '../core/service/store.service';
import {Router} from '@angular/router';
import {LoadingService} from '../core/service/loading.service';
import {AlertService} from '../core/service/alert.service';

@Injectable()
export class AppAuthService {

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

  constructor(private api: ApiService,
              private storeService: StoreService,
              private router: Router,
              private loadingService: LoadingService,
              private alertService: AlertService) {
  }

  public login(user: User, type: string = '') {
    this.loadingService.start();
    switch (type) {
      case 'facebook' :
      case 'google' :
        this.getUser(type, user.externalId)
          .then(() => {
            // login exitoso rutear a la pagina principal
            this.normalLogin(user, type)
              .then(() => {
                this.loadingService.finish();
              });
          })
          .catch(() => {
            // el usuario no existe, registrarlo
            localStorage.setItem('socialUser', JSON.stringify(user));
            this.router.navigate(['/register-social']);
            this.loadingService.finish();
          });
        return;
      default :
        return this.normalLogin(user)
          .then(() => {
            this.loadingService.finish();
          })
          .catch(() => {
            this.loadingService.finish();
          });
    }

  }

  public logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.api.removeJwt();
    return this.router.navigate(['/login']);
  }

  public getUser(type: string, id: string) {
    const path = 'users/external?externalId=' + id + '&type=' + type;
    return this.api.get(path);
  }


  normalLogin(user: User, type: string = '') {
    const path = 'login';
    return this.api.loginPost(path, user)
      .then(() => {
        this.router.navigate(['/']);
      });
  }

}
