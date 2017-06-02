import {Injectable} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LoadingService {

  private subject = new Subject<any>();
  private promises: Promise<any>[] = [];

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.subject.next();
      }
    });
  }

  private start() {
    this.subject.next(true);
  }

  private finish() {
    this.subject.next(false);
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  setLoading(promise: Promise<any>) {

    this.start();

    this.promises.push(promise);

    Promise.all(this.promises)
      .catch(() => this.finish())
      .then(() => {
        setTimeout(() => {
          this.finish();
        }, 300);
      });

  }

}