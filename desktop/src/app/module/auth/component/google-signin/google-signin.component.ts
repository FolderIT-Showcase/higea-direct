import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {AppAuthService} from '../../auth.service';
import {User} from '../../../core/domain/user';
import {Router} from '@angular/router';
import {AlertService} from '../../../core/service/alert.service';

declare const gapi: any;

@Component({
  selector: 'app-google-signin',
  templateUrl: './google-signin.component.html'
})
export class GoogleSigninComponent implements AfterViewInit {

  private clientId = '170472707371-iqab7gbqta7jq9kgt1fbs8ajrh7llcfc.apps.googleusercontent.com';

  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly'
  ].join(' ');

  public auth2: any = gapi.auth2;

  constructor(private element: ElementRef,
              private auth: AppAuthService,
              private router: Router,
              private alert: AlertService) {
  }

  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: this.clientId,
        cookiepolicy: 'single_host_origin',
        scope: this.scope
      });
      this.attachSignin(this.element.nativeElement.firstChild);
    });
  }

  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const user: User = new User();
        user.email = googleUser.getBasicProfile().getEmail();
        user.externalId = googleUser.getBasicProfile().getId();
        localStorage.setItem('socialUser', JSON.stringify(user));
        console.log(user);
        this.auth.login(user, 'google');
        googleUser.disconnect();
      }, (error) => {
        this.router.navigate(['/login']);
        this.alert.error('Error, por favor intente con otra forma autenticación');
        console.error(error);
      });
  }


  ngAfterViewInit() {
    this.googleInit();
  }

}

