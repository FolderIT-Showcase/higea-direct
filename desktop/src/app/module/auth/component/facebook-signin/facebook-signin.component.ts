import {Component} from '@angular/core';
import {AppAuthService} from '../../auth.service';
import {FacebookService, InitParams, LoginOptions, LoginResponse} from 'ngx-facebook';
import {User} from '../../../core/domain/user';

@Component({
  selector: 'app-facebook-signin',
  templateUrl: './facebook-signin.component.html'
})
export class FacebookSigninComponent {

  constructor(private auth: AppAuthService, private fb: FacebookService) {

    const initParams: InitParams = {
      appId: '285797451868355',
      xfbml: true,
      version: 'v2.8'
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
        this.fb.api('/me', 'get', {fields: 'email'})
          .then(data => {
            const user: User = new User();
            user.externalId = response.authResponse.userID;
            user.email = data.email;
            user.username = data.email;
            this.auth.login(user, 'facebook');
            this.fb.logout();
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

}
