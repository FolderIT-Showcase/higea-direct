import {Component, OnInit} from '@angular/core';
import {AppAuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import {UtilsService} from '../../../service/utils.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isAuth = false;
  isIn = false;
  license = localStorage.getItem('license');

  constructor(private auth: AppAuthService, private router: Router) {
    router.events.subscribe((data) => this.isIn = false);
  }

  ngOnInit(): void {
    this.isAuth = AppAuthService.isAdmin() && (this.license === 'core') && UtilsService.getWidth() >= 900;
  }

  toggleState() {
    this.isIn = !this.isIn;
  }

  logout() {
    this.auth.logout();
  }

}
