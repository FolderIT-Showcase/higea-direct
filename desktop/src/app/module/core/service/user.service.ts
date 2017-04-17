import {Injectable} from '@angular/core';


import {ApiService} from './api.service';
import {User} from '../domain/user';

@Injectable()
export class UserService {
  constructor(private api: ApiService) {
  }

  getAll() {
    return this.api.get('users').first().toPromise();
  }

  getById(id: number) {
    return this.api.get('users/' + id);
  }

  create(user: User) {
    return this.api.post('users', user);
  }

  update(user: User) {
    return this.api.put('users/' + user.id, user);
  }

  delete(id: number) {
    return this.api.delete('users/' + id);
  }

}
