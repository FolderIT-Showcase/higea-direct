import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../core/service/authentication.service';
import {AlertService} from '../../core/service/alert.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
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

}
