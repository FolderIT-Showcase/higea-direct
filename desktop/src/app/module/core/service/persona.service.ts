import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {User} from '../domain/user';
import {Persona} from '../domain/persona';

@Injectable()
export class PersonaService {
  constructor(private api: ApiService) {
  }

  getById(id: number) {
    return this.api.get('users/' + id).first().toPromise();
  }

  create(persona: Persona) {
    return this.api.post('users', persona).first().toPromise();
  }

  update(user: User) {
    return this.api.put('users/' + user.id, user).first().toPromise();
  }

}
