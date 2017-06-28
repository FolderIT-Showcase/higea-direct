import {Component} from '@angular/core';
import {AppAuthService} from '../../auth.service';
import {FacebookService, InitParams, LoginOptions, LoginResponse} from 'ngx-facebook';
import {User} from '../../../../domain/user';
import {Router} from '@angular/router';
import {AlertService} from '../../../../service/alert.service';

@Component({
  selector: 'app-facebook-signin',
  templateUrl: './facebook-signin.component.html'
})
export class FacebookSigninComponent {

  constructor(private auth: AppAuthService,
              private fb: FacebookService,
              private router: Router,
              private alert: AlertService) {

    const initParams: InitParams = {
      appId: '285797451868355',
      xfbml: true,
      version: 'v2.9'
    };

    fb.init(initParams);

  }

  onFacebookLoginClick() {
    const options: LoginOptions = {
      scope: 'email',
      return_scopes: true,
      enable_profile_selector: true
    };
    this.fb.login(options)
      .then((response: LoginResponse) => {
        this.fb.api('/me', 'get', {fields: 'id,first_name,last_name,email'})
          .then((data: any) => {
            const user: User = new User();
            user.password = data.id;
            user.email = data.email;
            user.firstName = data.first_name;
            user.lastName = data.last_name;
            localStorage.setItem('socialUser', JSON.stringify(user));
            this.auth.login(user);
            this.fb.logout();
          })
          .catch(error => {
            this.router.navigate(['/auth/login']);
            this.alert.error('Error, por favor intente con otra forma autenticación');
          });
      });
  }

}
