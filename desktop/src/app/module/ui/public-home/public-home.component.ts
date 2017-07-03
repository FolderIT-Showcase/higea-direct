import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StoreService} from '../../../service/store.service';

@Component({
  selector: 'app-public-home',
  templateUrl: './public-home.component.html'
})
export class PublicHomeComponent implements OnInit {

  constructor(private router: Router, private storeService: StoreService) {
  }

  ngOnInit(): void {
    this.storeService.clearCache();
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

}
