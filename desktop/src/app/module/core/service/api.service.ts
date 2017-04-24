import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import {User} from '../domain/user';

@Injectable()
export class ApiService {

 // private baseURL = 'proxy/';  // https://localhost:8080/

  private baseURL = 'https://localhost:8080/';  // https://localhost:8080/
  private headers = new Headers({'Content-Type': 'application/json','Access-Control-Allow-Origin': '*','Accept': 'application/json','X-Requested-With': 'XMLHttpRequest' });

  /*private headers: Headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  });*/

  private static getJson(response: Response) {
    return response.json();
  }

  private static checkForError(response: Response): Response | Observable<any> {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const error = new Error(response.statusText);
    error['response'] = response;
    throw error;
  }

  constructor(private http: Http) {
  }

  useJwt() {
    const user: User = JSON.parse(localStorage.getItem('currentUser'));
    this.headers.append('authorization', user.token);
  }

  removeJwt() {
    this.headers.delete('authorization');
  }

  get(path: string, search: URLSearchParams = undefined, headers: Headers = undefined): Observable<any> {
    const options = {
      headers: headers || this.headers,
      search: search
    };

    return this.http.get(`${this.baseURL}${path}`, {headers: this.headers})
      .map(ApiService.checkForError)
      .catch(err => Observable.throw(err))
      .map(ApiService.getJson);
  }

  public post(path: string, body): Observable<any> {
    return this.http
      .post(`${this.baseURL}${path}`, JSON.stringify(body), {headers: this.headers})
      .map(ApiService.checkForError)
      .catch(err => Observable.throw(err))
      .map(ApiService.getJson);
  }

  public put(path: string, body): Observable<any> {
    return this.http
      .put(`${this.baseURL}${path}`, JSON.stringify(body), {headers: this.headers})
      .map(ApiService.checkForError)
      .catch(err => Observable.throw(err));
    // .map(this.getJson);
  }

  public patch(path: string, body): Observable<any> {
    return this.http
      .patch(`${this.baseURL}${path}`, JSON.stringify(body), {headers: this.headers})
      .map(ApiService.checkForError)
      .catch(err => Observable.throw(err));
    // .map(this.getJson);
  }

  public delete(path): Observable<any> {
    return this.http.delete(`${this.baseURL}${path}`, {headers: this.headers})
      .map(ApiService.checkForError)
      .catch(err => Observable.throw(err));
    // .map(this.getJson);
  }

  public loginPost(path: string, body): Observable<any> {
    return this.http
      .post(`${this.baseURL}${path}`, JSON.stringify(body), {headers: this.headers})
      .map(ApiService.checkForError)
      .catch(err => Observable.throw(err));
  }

}
