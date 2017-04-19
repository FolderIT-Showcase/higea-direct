import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginResponse} from 'ng2-facebook-sdk';
import {AlertService} from '../../../core/service/alert.service';
import {AppAuthService} from '../../auth.service';
import {User} from '../../../core/domain/user';

declare const gapi: any;

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
  public auth2: any;

  clientId = '170472707371-iqab7gbqta7jq9kgt1fbs8ajrh7llcfc.apps.googleusercontent.com';

  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly'
  ].join(' ');

  constructor(private router: Router,
              private alertService: AlertService,
              private auth: AppAuthService) {


  }

  ngOnInit() {
    // reset login status
    this.auth.logout();
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

  onSubmit() {

    // this.router.navigate(['/home']);

    this.loading = true;
    const user = new User();
    user.username = this.model.username;
    user.password = this.model.password;
    this.auth.login(user)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.alertService.error(error);
        this.loading = false;
      });

  }

}
