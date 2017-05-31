import {Injectable} from '@angular/core';
import {Headers, Http, Response, ResponseContentType} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {User} from '../domain/user';
import {Router} from '@angular/router';
import {AlertService} from './alert.service';
import {AppException} from '../domain/AppException';
import {LoadingService} from './loading.service';
import {JwtHelper} from 'angular2-jwt';
import * as FileSaver from 'file-saver';

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

  private mPromise: Promise<any>;

  static getJson(response: Response) {
    return response.json();
  }

  constructor(private http: Http,
              private router: Router,
              private loadingService: LoadingService,
              private alertService: AlertService) {

    this.http.get('assets/license.json')
      .map(res => res.json()).first().toPromise()
      .then(data => {
        localStorage.setItem('license', this.jwtHelper.decodeToken(data.token).license);
        localStorage.setItem('client', this.jwtHelper.decodeToken(data.token).client);
      });
  }

  filterError(response: Response): Response | any {
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
    // throw new Error(mException.error);
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
      .map(this.filterError)
      .map(ApiService.getJson)
      .first().toPromise().catch(error => this.catchException(error.json()));
    this.loadingService.setLoading(this.mPromise);
    return this.mPromise;
  }

  getFile(path: string, mimeType: string, filename: string, obj: any, isAuthNecessary: boolean = true) {
    this.isAuthNecessary(isAuthNecessary);
    this.headers.set('Accept', mimeType);
    const options = {
      responseType: ResponseContentType.Blob,
      headers:  this.headers
    };


    this.mPromise = this.http.post(`${this.baseURL}${path}`, JSON.stringify(obj), options)
      .map(this.filterError)
      .map((response: Response) => {
        const content: Blob = response.blob();
        const contentDisposition = response.headers.get('Content-Disposition') || '';

        FileSaver.saveAs(content, filename);

        return response;
      }).first().toPromise();
    return this.mPromise;
  }

  public post(path: string, body, isAuthNecessary: boolean = true): Promise<any> {
    this.isAuthNecessary(isAuthNecessary);
    this.mPromise = this.http
      .post(`${this.baseURL}${path}`, JSON.stringify(body), {headers: this.headers})
      .map(this.filterError)
      .map(ApiService.getJson)
      .first().toPromise().catch(error => this.catchException(error.json()));
    this.loadingService.setLoading(this.mPromise);
    return this.mPromise;
  }

  public put(path: string, body, isAuthNecessary: boolean = true): Promise<any> {
    this.isAuthNecessary(isAuthNecessary);
    this.mPromise = this.http
      .put(`${this.baseURL}${path}`, JSON.stringify(body), {headers: this.headers})
      .map(this.filterError)
      .map(ApiService.getJson)
      .first().toPromise().catch(error => this.catchException(error.json()));
    this.loadingService.setLoading(this.mPromise);
    return this.mPromise;
  }

  public patch(path: string, body, isAuthNecessary: boolean = true): Promise<any> {
    this.isAuthNecessary(isAuthNecessary);
    this.mPromise = this.http
      .patch(`${this.baseURL}${path}`, JSON.stringify(body), {headers: this.headers})
      .map(this.filterError)
      .first().toPromise().catch(error => this.catchException(error.json()));
    this.loadingService.setLoading(this.mPromise);
    return this.mPromise;
  }

  public delete(path, isAuthNecessary: boolean = true): Promise<any> {
    this.isAuthNecessary(isAuthNecessary);
    this.mPromise = this.http.delete(`${this.baseURL}${path}`, {headers: this.headers})
      .map(this.filterError)
      .first().toPromise().catch(error => this.catchException(error.json()));
    this.loadingService.setLoading(this.mPromise);
    return this.mPromise;
  }

  public loginPost(path: string, body): Promise<any> {
    this.mPromise = this.http
      .post(`${this.baseURL}${path}`, JSON.stringify(body), {headers: this.headers})
      .map(this.filterError)
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
