import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../../service/alert.service';
import {Headers, Http} from '@angular/http';
import {PersonaService} from '../../../../service/persona.service';

@Component({
  selector: 'app-user-active',
  templateUrl: './user.active.component.html'
})
export class UserActiveComponent implements OnInit {

  token: string;
  loading = false;
  title = '';
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  });

  constructor(private router: Router,
              private http: Http,
              private personaService: PersonaService,
              private alertService: AlertService,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {

    // Capture the access token and code
    this.route
      .queryParams.first().toPromise()
      .then(params => {
        this.token = params['token'];

        // do something with this.code and this.accesstoken
        this.personaService.activateUser(this.token)
          .then(data => {
            this.router.navigate(['/login']).then(() => {
              this.alertService.success('Usuario Activado');
            });
          });
      });

  }

}
