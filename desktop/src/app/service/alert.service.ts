import {Injectable} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class AlertService {
  private subject = new Subject<any>();

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) this.subject.next();
    });
  }

  public success(message: string) {
    this.subject.next({type: 'success', text: message});
  }

  public error(message: string) {
    this.subject.next({type: 'error', text: message});
  }

  public getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  public reset(){
    this.subject.next({type: 'error', text: undefined });
  }

}
