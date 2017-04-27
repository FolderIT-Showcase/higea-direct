import {Injectable} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LoadingService {

  private subject = new Subject<any>();

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.subject.next();
      }
    });
  }

  start() {
    this.subject.next(true);
  }

  finish() {
    this.subject.next(false);
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

}
