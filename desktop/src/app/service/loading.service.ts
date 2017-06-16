import {Injectable} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LoadingService {

  private subject = new Subject<any>();
  private promises: Promise<any>[] = [];
  private promiseCount = 0;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.subject.next();
      }
    });
  }

  public start() {
    this.promiseCount++;
    this.subject.next(this.promiseCount);
  }

  public finish() {
    if(this.promiseCount){
      this.promiseCount--;
    }
    this.subject.next(this.promiseCount);
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  setLoading(promise: Promise<any>) {
    this.start();
    this.promises.push(promise);
    Promise.all(this.promises).catch(() => this.finish()).then(() => this.finish());

  }

}
