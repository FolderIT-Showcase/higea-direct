import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AppState} from '../domain/app-state';
import * as localforage from 'localforage';

// estado inicial
const state: AppState = new AppState();
const store = new BehaviorSubject<AppState>(state);


@Injectable()
export class Store {
  private store = store;
  public db = localforage.createInstance({name: 'Turnero'});
  public changes = store
    .asObservable()
    .distinctUntilChanged()
    // log new state
    .do(changes => {
      for (const key in changes) {
        if (!changes.hasOwnProperty(key)) {
          return;
        }
        if (key === 'paises' || key === 'provincias' || key === 'localidades') {
          return;
        }
        localforage.setItem(key, changes[key]);
      }
    });

  constructor() {
    for (const key in state) {
      if (state.hasOwnProperty(key)) {
        localforage.getItem(key).then(data => {
          state[key] = data;
        }).catch(() => {
        });
      }
    }
  }

  public getState(): AppState {
    return this.store.value;
  }

  public setState(appState: AppState) {
    this.store.next(appState);
  }

  public clear() {
    this.store.next(state);
  }

}
