import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Persona} from '../domain/persona';

@Injectable()
export class PersonaService {
  constructor(private api: ApiService) {
  }

  create(persona: Persona) {
    return this.api.post('users/registration', persona).first().toPromise();
  }

}
