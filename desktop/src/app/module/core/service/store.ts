import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AppState} from '../domain/app-state';

// estado inicial
const state: AppState = {
  user: null,
  paises: [],
  loginType: null
};

const store = new BehaviorSubject<AppState>(state);

@Injectable()
export class Store {
  private store = store;
  public changes = store
    .asObservable()
    .distinctUntilChanged()
    // log new state
    .do(changes => console.log('new state', changes));

  public getState(): AppState {
    return this.store.value;
  }

  public setState(appState: AppState) {
    console.log('setState ', appState); // log update
    this.store.next(appState);
  }

  public clear() {
    this.store.next(state);
  }

}
