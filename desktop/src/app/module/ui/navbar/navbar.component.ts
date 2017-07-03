import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isAuth = false;
  isIn = false;
  license = localStorage.getItem('license');

  constructor(private router: Router) {
    router.events.subscribe((data) => this.isIn = false);
  }

  ngOnInit(): void {
  }

  toggleState() {
    this.isIn = !this.isIn;
  }

}
