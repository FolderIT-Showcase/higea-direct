import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AlertService} from '../../../core/service/alert.service';
import {AppAuthService} from '../../auth.service';
import {User} from '../../../core/domain/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  model: any = {};
  loading = false;
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
    this.loading = true;
    const user = new User();
    user.username = this.model.username;
    user.password = this.model.password;
    this.auth.login(user)
      .catch(error => {
        this.alertService.error(error);
        this.loading = false;
      });
  }

}
