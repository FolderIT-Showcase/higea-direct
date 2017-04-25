import {Component} from '@angular/core';
import {AppAuthService} from '../../../auth/auth.service';
import {AlertService} from '../../service/alert.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private auth: AppAuthService, private alert: AlertService) {

  }

  logout() {
    this.auth.logout()
      .then(() => {
        this.alert.success('Gracias por usar nuestros servicios');
      })
      .catch(error => {
        console.error(error);
      });
  }

}
