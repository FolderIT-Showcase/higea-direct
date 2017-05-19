import {Component, OnInit} from '@angular/core';
import {AppAuthService} from '../../../auth/auth.service';
import {AlertService} from '../../service/alert.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isAuth = false;
  isIn = false;

  constructor(private auth: AppAuthService, private alert: AlertService) {
  }

  ngOnInit(): void {
    this.isAuth = AppAuthService.isAdmin();
  }

  toggleState() { // click handler
    this.isIn = !this.isIn;
  }

  logout() {
    this.auth.logout()
      .then(() => {
      })
      .catch(error => {
        console.error(error);
      });
  }

}
