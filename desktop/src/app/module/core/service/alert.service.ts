﻿import {Injectable} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class AlertService {
  private subject = new Subject<any>();
  private await = 300; // tiempo pruedente antes de lanzar la notificacion

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.subject.next();
      }
    });
  }

  success(message: string) {
    setTimeout(() => {
      this.subject.next({type: 'success', text: message});
    }, this.await);
  }

  error(message: string) {
    setTimeout(() => {
      this.subject.next({type: 'error', text: message});
    }, this.await);
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

}
