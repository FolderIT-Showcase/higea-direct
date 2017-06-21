import {Injectable} from '@angular/core';
import {Headers, Http, Response, ResponseContentType} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {User} from '../domain/user';
import {Router} from '@angular/router';
import {LoadingService} from './loading.service';
import {JwtHelper} from 'angular2-jwt';
import {Observable} from 'rxjs/Observable';
import {AlertService} from './alert.service';

declare const require: any;
const FileSaver: any = require('file-saver');

@Injectable()
export class ApiService {

  private jwtHelper: JwtHelper = new JwtHelper();
  private baseURL = 'api/';
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  });

  private static getJson(response: Response) {
    return response.json();
  }

  private static filterError(response): Response {
    if (response.status >= 200 && response.status < 300) return response;
    else throw new Error(response.error)
  }

  constructor(private http: Http,
              private router: Router,
              private loadingService: LoadingService,
              private alertService: AlertService) {

    this.http.get('assets/license.json')
      .map(res => res.json())
      .first().toPromise()
      .then((data: any) => {
        localStorage.setItem('license', this.jwtHelper.decodeToken(data.token).license);
        localStorage.setItem('client', this.jwtHelper.decodeToken(data.token).client);
      });
  }

  isAuthNecessary(isAuthNecessary: boolean) {
    this.headers.set('Accept', 'application/json');
    if (!isAuthNecessary) return;
    // use jwt
    if (!this.headers.get('authorization')) {
      const user: User = JSON.parse(localStorage.getItem('currentUser'));
      if (user && user.token) this.headers.append('authorization', user.token);
    }
    // check if logged
    if (!this.headers.get('authorization')) {
      localStorage.removeItem('currentUser');
      this.router.navigate(['/']);
    }
  }

  removeJwt() {
    this.headers.delete('authorization');
  }

  private catchBadResponse(err: any) {
    // log and handle the exception
    console.log(err.error);
    this.alertService.error(err.error)
    return new Observable();
  }

  get(path: string, isAuthNecessary: boolean = true): Promise<any> {
    this.loadingService.start();
    this.isAuthNecessary(isAuthNecessary);
    return this.http.get(`${this.baseURL}${path}`, {headers: this.headers})
      .map(ApiService.filterError)
      .map(ApiService.getJson)
      .catch(error => this.catchBadResponse(error))
      .finally(() => this.loadingService.finish())
      .first().toPromise();
  }

  getFile(path: string, mimeType: string, filename: string, obj: any, isAuthNecessary: boolean = true) {
    this.loadingService.start();
    this.isAuthNecessary(isAuthNecessary);
    this.headers.set('Accept', mimeType);
    const options = {
      responseType: ResponseContentType.Blob,
      headers: this.headers
    };

    return this.http.post(`${this.baseURL}${path}`, JSON.stringify(obj), options)
      .map(ApiService.filterError)
      .map((response: Response) => {
        const content: Blob = response.blob();
        const contentDisposition = response.headers.get('Content-Disposition') || '';

        FileSaver.saveAs(content, filename);

        return response;
      })
      .catch(error => this.catchBadResponse(error))
      .finally(() => this.loadingService.finish())
      .first().toPromise();
  }

  public post(path: string, body, isAuthNecessary: boolean = true): Promise<any> {
    this.loadingService.start();
    this.isAuthNecessary(isAuthNecessary);
    return this.http
      .post(`${this.baseURL}${path}`, JSON.stringify(body), {headers: this.headers})
      .map(ApiService.filterError)
      .map(ApiService.getJson)
      .catch(error => this.catchBadResponse(error))
      .finally(() => this.loadingService.finish())
      .first().toPromise();
  }

  public put(path: string, body, isAuthNecessary: boolean = true): Promise<any> {
    this.loadingService.start();
    this.isAuthNecessary(isAuthNecessary);
    return this.http
      .put(`${this.baseURL}${path}`, JSON.stringify(body), {headers: this.headers})
      .map(ApiService.filterError)
      .map(ApiService.getJson)
      .catch(error => this.catchBadResponse(error))
      .finally(() => this.loadingService.finish())
      .first().toPromise();
  }

  public patch(path: string, body, isAuthNecessary: boolean = true): Promise<any> {
    this.loadingService.start();
    this.isAuthNecessary(isAuthNecessary);
    return this.http
      .patch(`${this.baseURL}${path}`, JSON.stringify(body), {headers: this.headers})
      .map(ApiService.filterError)
      .map(ApiService.getJson)
      .catch(error => this.catchBadResponse(error))
      .finally(() => this.loadingService.finish())
      .first().toPromise();
  }

  public delete(path, isAuthNecessary: boolean = true): Promise<any> {
    this.loadingService.start();
    this.isAuthNecessary(isAuthNecessary);
    return this.http.delete(`${this.baseURL}${path}`, {headers: this.headers})
      .map(ApiService.filterError)
      .map(ApiService.getJson)
      .catch(error => this.catchBadResponse(error))
      .finally(() => this.loadingService.finish())
      .first().toPromise();
  }

  public loginPost(path: string, body): Promise<any> {
    this.loadingService.start();
    return this.http
      .post(`${this.baseURL}${path}`, JSON.stringify(body), {headers: this.headers})
      .map(ApiService.filterError)
      .map((response: Response) => {
        body.token = response.headers.get('authorization').slice(7);
        if (body && body.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(body));
        }
      })
      .catch(error => this.catchBadResponse(error))
      .finally(() => this.loadingService.finish())
      .first().toPromise();
  }

}
