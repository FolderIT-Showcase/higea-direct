import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AppState} from '../domain/app-state';

declare const require: Function;
// estado inicial
const state: AppState = new AppState();
const store = new BehaviorSubject<AppState>(state);
const localforage = require('localforage');

@Injectable()
export class Store {
  private store = store;
  public db = localforage.createInstance({name: 'Turnero'});
  public changes = store
    .asObservable()
    .distinctUntilChanged();

  public get(item: string){
    return this.db.getItem(item);
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
