import {Component, OnInit} from '@angular/core';
import {AppAuthService} from '../../auth.service';
import {User} from '../../../../domain/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model: any = {};

  constructor(private auth: AppAuthService) {
    localStorage.clear();
  }

  ngOnInit() {
    // reset login status
    this.auth.logout();
  }

  login() {
    const user = new User();
    user.email = this.model.email.trim();
    user.password = this.model.password;
    this.auth.login(user);
  }

}
