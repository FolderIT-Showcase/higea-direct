import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import {User} from '../domain/user';
import {Router} from '@angular/router';

@Injectable()
export class ApiService {

  private baseURL = 'api/';  // https://localhost:8080/

  // private baseURL = 'https://localhost:8080/';  // https://localhost:8080/
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  });

  static getJson(response: Response) {
    return response.json();
  }

  static checkForError(response: Response): Response | Observable<any> {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const error = new Error(response.statusText);
    error['response'] = response;
    throw error;
  }

  constructor(private http: Http, private router: Router) {

  }

  useJwt() {
    if (!this.headers.get('authorization')) {
      const user: User = JSON.parse(localStorage.getItem('currentUser'));
      if (user && user.token) {
        this.headers.append('authorization', user.token);
      }
    }
  }

  removeJwt() {
    this.headers.delete('authorization');
  }

  checkLogged() {
    if (!this.headers.get('authorization')) {
      localStorage.removeItem('currentUser');
      this.router.navigate(['/login']);
      return;
    }
  }

  get(path: string, isAuthNecessary: boolean = true): Observable<any> {
    if (isAuthNecessary) {
      this.useJwt();
      this.checkLogged();
    }

    return this.http.get(`${this.baseURL}${path}`, {headers: this.headers})
      .map(ApiService.checkForError)
      .catch(err => Observable.throw(err))
      .map(ApiService.getJson);
  }

  public post(path: string, body, isAuthNecessary: boolean = true): Observable<any> {
    if (isAuthNecessary) {
      this.useJwt();
      this.checkLogged();
    }
    return this.http
      .post(`${this.baseURL}${path}`, JSON.stringify(body), {headers: this.headers})
      .map(ApiService.checkForError)
      .catch(err => Observable.throw(err))
      .map(ApiService.getJson);
  }

  public put(path: string, body, isAuthNecessary: boolean = true): Observable<any> {
    if (isAuthNecessary) {
      this.useJwt();
      this.checkLogged();
    }
    return this.http
      .put(`${this.baseURL}${path}`, JSON.stringify(body), {headers: this.headers})
      .map(ApiService.checkForError)
      .catch(err => Observable.throw(err));
  }

  public patch(path: string, body, isAuthNecessary: boolean = true): Observable<any> {
    if (isAuthNecessary) {
      this.useJwt();
      this.checkLogged();
    }
    return this.http
      .patch(`${this.baseURL}${path}`, JSON.stringify(body), {headers: this.headers})
      .map(ApiService.checkForError)
      .catch(err => Observable.throw(err));
  }

  public delete(path, isAuthNecessary: boolean = true): Observable<any> {
    if (isAuthNecessary) {
      this.useJwt();
      this.checkLogged();
    }
    return this.http.delete(`${this.baseURL}${path}`, {headers: this.headers})
      .map(ApiService.checkForError)
      .catch(err => Observable.throw(err));
  }

  public loginPost(path: string, body): Observable<any> {
    return this.http
      .post(`${this.baseURL}${path}`, JSON.stringify(body), {headers: this.headers})
      .map(ApiService.checkForError)
      .catch(err => Observable.throw(err));
  }

}
