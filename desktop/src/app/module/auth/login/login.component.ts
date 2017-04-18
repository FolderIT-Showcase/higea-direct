import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AlertService} from '../../core/service/alert.service';
import {AppAuthService} from '../auth.service';
import {FacebookService, InitParams, LoginResponse} from 'ng2-facebook-sdk';
import {GoogleSignInSuccess} from 'angular-google-signin';
import GoogleAuth = gapi.auth2.GoogleAuth;
import GoogleUser = gapi.auth2.GoogleUser;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  model: any = {};
  loading = false;
  sub1: any;
  user;
  googleUser: gapi.auth2.GoogleUser = null;

  myClientId = '170472707371-iqab7gbqta7jq9kgt1fbs8ajrh7llcfc.apps.googleusercontent.com';

  constructor(private router: Router,
              private alertService: AlertService,
              private auth: AppAuthService,
              // oauth auth service
              private fb: FacebookService) {

    const initParams: InitParams = {
      appId: '285797451868355',
      xfbml: true,
      version: 'v2.8'
    };

    fb.init(initParams);

  }

  ngOnInit() {
    // reset login status
    this.auth.logout();
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
  }

  onSubmit() {

    this.router.navigate(['/home']);

    /*    this.loading = true;
     const user = new User();
     user.username = this.model.username;
     user.password = this.model.password;
     this.authenticationService.login(user)
     .then(() => {
     this.router.navigate(['/']);
     })
     .catch(error => {
     this.alertService.error(error);
     this.loading = false;
     });*/

  }

  loginWithFacebook(): void {

    this.fb.login()
      .then((response: LoginResponse) => console.log(response))
      .catch((error: any) => console.error(error));

  }

  onGoogleSignInSuccess(event: GoogleSignInSuccess) {
    this.googleUser = event.googleUser;
    const googleUser: gapi.auth2.GoogleUser = event.googleUser;
    const id: string = googleUser.getId();
    const profile: gapi.auth2.BasicProfile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
  }

  googleLogOut() {
    this.googleUser.disconnect();
  }

}
