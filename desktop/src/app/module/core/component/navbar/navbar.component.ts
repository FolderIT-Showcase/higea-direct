import {Component, OnInit} from '@angular/core';
import {AppAuthService} from '../../../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isAuth = false;
  isIn = false;

  constructor(private auth: AppAuthService,
              private router: Router) {
    router.events.subscribe((val) => {
      this.isIn = false;
    });
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
