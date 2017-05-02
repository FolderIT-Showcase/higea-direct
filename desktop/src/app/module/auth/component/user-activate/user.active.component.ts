import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../core/service/alert.service';
import {ApiService} from '../../../core/service/api.service';
import {Headers, Http, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

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

        this.get('api/users/regitrationConfirm?token=' + this.token).first().toPromise()
          .then(data => {
            this.router.navigate(['/login']).then(() => {
              this.alertService.success('Usuario Activado');
            });
          })
          .catch(error => {
            console.error(error);
            this.alertService.error(error);
          });
      })
      .catch(error => {
        console.error(error);
      });

  }

  get(path: string, search: URLSearchParams = undefined, headers: Headers = undefined): Observable<any> {
    const options = new RequestOptions({
      // Have to make a URLSearchParams with a query string
      search: search,
      headers: headers || this.headers
    });

    return this.http.get(path, options)
      .map(ApiService.checkForError)
      .catch(err => Observable.throw(err))
      .map(ApiService.getJson);
  }

}
