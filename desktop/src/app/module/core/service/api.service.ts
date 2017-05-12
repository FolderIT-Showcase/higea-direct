import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {User} from '../domain/user';
import {Router} from '@angular/router';
import {AlertService} from './alert.service';
import {AppException} from '../domain/AppException';
import {LoadingService} from './loading.service';

@Injectable()
export class ApiService {

  private baseURL = 'api/';
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  });

  private mPromise: Promise<any>;

  static getJson(response: Response) {
    return response.json();
  }

  constructor(private http: Http,
              private router: Router,
              private loadingService: LoadingService,
              private alertService: AlertService) {

  }

  checkForError(response: Response): Response | any {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
  }

  catchException(exception: AppException) {
    let mException = exception;
    if (mException.error) {
    } else {
      mException = new AppException();
    }
    this.alertService.error(mException.error);
    throw new Error(mException.error);
  }

  isAuthNecessary(isAuthNecessary: boolean) {
    if (!isAuthNecessary) {
      return;
    }
    // use jwt
    if (!this.headers.get('authorization')) {
      const user: User = JSON.parse(localStorage.getItem('currentUser'));
      if (user && user.token) {
        this.headers.append('authorization', user.token);
      }
    }
    // check if logged
    if (!this.headers.get('authorization')) {
      localStorage.removeItem('currentUser');
      this.router.navigate(['/login']);
      return;
    }
  }

  removeJwt() {
    this.headers.delete('authorization');
  }

  get(path: string, isAuthNecessary: boolean = true): Promise<any> {
    this.isAuthNecessary(isAuthNecessary);
    this.mPromise = this.http.get(`${this.baseURL}${path}`, {headers: this.headers})
      .map(this.checkForError)
      .map(ApiService.getJson)
      .first().toPromise().catch(error => this.catchException(error.json()));
    this.loadingService.setLoading(this.mPromise);
    return this.mPromise;
  }

  public post(path: string, body, isAuthNecessary: boolean = true): Promise<any> {
    this.isAuthNecessary(isAuthNecessary);
    this.mPromise = this.http
      .post(`${this.baseURL}${path}`, JSON.stringify(body), {headers: this.headers})
      .map(this.checkForError)
      .map(ApiService.getJson)
      .first().toPromise().catch(error => this.catchException(error.json()));
    this.loadingService.setLoading(this.mPromise);
    return this.mPromise;
  }

  public put(path: string, body, isAuthNecessary: boolean = true): Promise<any> {
    this.isAuthNecessary(isAuthNecessary);
    this.mPromise = this.http
      .put(`${this.baseURL}${path}`, JSON.stringify(body), {headers: this.headers})
      .map(this.checkForError)
      .map(ApiService.getJson)
      .first().toPromise().catch(error => this.catchException(error.json()));
    this.loadingService.setLoading(this.mPromise);
    return this.mPromise;
  }

  public patch(path: string, body, isAuthNecessary: boolean = true): Promise<any> {
    this.isAuthNecessary(isAuthNecessary);
    this.mPromise = this.http
      .patch(`${this.baseURL}${path}`, JSON.stringify(body), {headers: this.headers})
      .map(this.checkForError)
      .first().toPromise().catch(error => this.catchException(error.json()));
    this.loadingService.setLoading(this.mPromise);
    return this.mPromise;
  }

  public delete(path, isAuthNecessary: boolean = true): Promise<any> {
    this.isAuthNecessary(isAuthNecessary);
    this.mPromise = this.http.delete(`${this.baseURL}${path}`, {headers: this.headers})
      .map(this.checkForError)
      .first().toPromise().catch(error => this.catchException(error.json()));
    this.loadingService.setLoading(this.mPromise);
    return this.mPromise;
  }

  public loginPost(path: string, body): Promise<any> {
    this.mPromise = this.http
      .post(`${this.baseURL}${path}`, JSON.stringify(body), {headers: this.headers})
      .map(this.checkForError)
      .map((response: Response) => {
        body.token = response.headers.get('authorization').slice(7);
        if (body && body.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(body));
        }
      })
      .first().toPromise();
    this.loadingService.setLoading(this.mPromise);
    return this.mPromise;
  }

}
