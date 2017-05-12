import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MetadataService} from '../../service/metadata.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor(private router: Router) {
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

}
