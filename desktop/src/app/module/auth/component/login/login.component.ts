import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AlertService} from '../../../../service/alert.service';
import {AppAuthService} from '../../auth.service';
import {User} from '../../../../domain/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  model: any = {};
  sub1: any;

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

  login() {
    const user = new User();
    user.email = this.model.email;
    user.password = this.model.password;
    this.auth.login(user)
      .catch(error => {
        this.alertService.error(error);
      });
  }

}
