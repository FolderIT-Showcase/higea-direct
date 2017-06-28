import {Injectable} from '@angular/core';
import {Headers, Http, Response, ResponseContentType} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {User} from '../domain/user';
import {Router} from '@angular/router';
import {LoadingService} from './loading.service';
import {JwtHelper} from 'angular2-jwt';
import {AlertService} from './alert.service';
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
      const jwt = this.jwtHelper.decodeToken(user.token);
      if (user && user.token) this.headers.append('authorization', user.token);
      if (jwt.exp < Date.now() / 1000) {
        this.removeJwt();
        localStorage.removeItem('currentUser');
      }
    }
    // check if logged
    if (!this.headers.get('authorization')) {
      localStorage.removeItem('currentUser');
      this.router.navigate(['/']);
    }
  }

  private getHeaders(response: Response): Response {
    localStorage.setItem('headers', JSON.stringify(response.headers));
    return response;
  }

  removeJwt() {
    this.headers.delete('authorization');
  }

  private processResponse(response: Response): Response {
    if(response.status < 200 || response.status >= 300) throw new Error();
    let data = null;
    try {
      data = response.json();
    } catch (error) {
      return response
    }
    return data;
  }

  private async catchError(error) {
    this.loadingService.reset();
    try {
      const body = error.json();
      let mensaje = 'Error Interno, por favor intente mas tarde';
      if (body.error) mensaje = body.error;
      if (body.message) mensaje = body.message;
      this.alertService.error(mensaje);
    } catch (error) {
      let mensaje = 'Error Interno, por favor intente mas tarde';
      this.alertService.error(mensaje);
    }
  }

  public async get(path: string, isAuthNecessary: boolean = true): Promise<any> {
    this.loadingService.start();
    this.isAuthNecessary(isAuthNecessary);
    this.mPromise = this.http.get(`${this.baseURL}${path}`, {headers: this.headers})
      .map(this.processResponse)
      .finally(() => this.loadingService.finish())
      .first().toPromise();

    Promise.all([this.mPromise]).catch(error => this.catchError(error));

    return this.mPromise;
  }

  public async getFile(path: string, mimeType: string, filename: string, obj: any, isAuthNecessary: boolean = true) {
    this.loadingService.start();
    this.isAuthNecessary(isAuthNecessary);
    this.headers.set('Accept', mimeType);
    const options = {
      responseType: ResponseContentType.Blob,
      headers: this.headers
    };

    this.mPromise = this.http.post(`${this.baseURL}${path}`, JSON.stringify(obj), options)
      .map((response: Response) => {
        const content: Blob = response.blob();
        const contentDisposition = response.headers.get('Content-Disposition') || '';
        FileSaver.saveAs(content, filename);
        return response;
      })
      .finally(() => this.loadingService.finish())
      .first().toPromise();

    Promise.all([this.mPromise]).catch(error => this.catchError(error));

    return this.mPromise;
  }

  public async post(path: string, body, isAuthNecessary: boolean = true): Promise<any> {
    this.loadingService.start();
    this.isAuthNecessary(isAuthNecessary);
    this.mPromise = this.http
      .post(`${this.baseURL}${path}`, JSON.stringify(body), {headers: this.headers})
      .map(this.getHeaders)
      .map(this.processResponse)
      .finally(() => this.loadingService.finish())
      .first().toPromise();

    Promise.all([this.mPromise]).catch(error => this.catchError(error));
    return this.mPromise;
  }

  public async put(path: string, body, isAuthNecessary: boolean = true): Promise<any> {
    this.loadingService.start();
    this.isAuthNecessary(isAuthNecessary);
    this.mPromise = this.http
      .put(`${this.baseURL}${path}`, JSON.stringify(body), {headers: this.headers})
      .map(this.processResponse)
      .finally(() => this.loadingService.finish())
      .first().toPromise();

    Promise.all([this.mPromise]).catch(error => this.catchError(error));
    return this.mPromise;
  }

  public async patch(path: string, body, isAuthNecessary: boolean = true): Promise<any> {
    this.loadingService.start();
    this.isAuthNecessary(isAuthNecessary);
    this.mPromise = this.http
      .patch(`${this.baseURL}${path}`, JSON.stringify(body), {headers: this.headers})
      .map(this.processResponse)
      .finally(() => this.loadingService.finish())
      .first().toPromise();

    Promise.all([this.mPromise]).catch(error => this.catchError(error));
    return this.mPromise;
  }

  public async delete(path, isAuthNecessary: boolean = true): Promise<any> {
    this.loadingService.start();
    this.isAuthNecessary(isAuthNecessary);
    this.mPromise = this.http.delete(`${this.baseURL}${path}`, {headers: this.headers})
      .map(this.processResponse)
      .finally(() => this.loadingService.finish())
      .first().toPromise();

    Promise.all([this.mPromise]).catch(error => this.catchError(error));
    return this.mPromise;
  }

}
