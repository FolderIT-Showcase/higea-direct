import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {Store} from './store';

@Injectable()
export class StoreService {

  constructor(private store: Store) {
  }

  update(prop, state) {
    const currentState = this.store.getState();
    this.store.setState(Object.assign({}, currentState, {[prop]: state}));
  }

  merge(obj) {
    const currentState = this.store.getState();
    this.store.setState(Object.assign({}, currentState, obj));
  }

  swap(prop, fn) {
    const currentState = this.store.getState();
    this.store.setState(
      Object.assign({}, currentState, {
        [prop]: fn(Object.assign({}, currentState[prop]))
      })
    );
  }

  remove(prop: string) {
    const state = this.store.getState();
    const nextState = Object.assign({}, state);
    delete nextState[prop];
    this.store.setState(nextState);
  }

  get(prop: string) {
    const state = this.store.getState();
    return state[prop];
  }

  add(prop, state) {
    const currentState = this.store.getState();
    const collection = currentState[prop];
    this.store.setState(Object.assign({}, currentState, {[prop]: [...collection, state]}));
  }

  findAndSet(coll, id, val) {
    const currentState = this.store.getState();
    const collection = currentState[coll];
    this.store.setState(Object.assign({}, currentState, {
      [coll]: collection.map(item => item.id === id ? val : item)
    }));
  }

  findAndSetProp(coll, id, prop, val) {
    const currentState = this.store.getState();
    const collection = currentState[coll];
    this.store.setState(Object.assign({}, currentState, {
      [coll]: collection.map(item => {
        if (item.id !== id) {
          return item;
        }
        return Object.assign({}, item, {[prop]: val});
      })
    }));
  }

  findAndDelete(prop, id) {
    const currentState = this.store.getState();
    const collection = currentState[prop];
    this.store.setState(Object.assign({}, currentState, {[prop]: collection.filter(item => item.id !== id)}));
  }

  find(prop, id) {
    const currentState = this.store.getState();
    const collection = currentState[prop];
    return collection && collection.find(item => item.id === id);
  }

  clear() {
    this.store.clear();
  }

  clearCache() {
    this.update('centrosSalud', []);
    this.update('turnos', []);
    this.update('integrantes', []);
  }

}
