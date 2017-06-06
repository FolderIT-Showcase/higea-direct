import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Persona} from '../domain/persona';
import {StoreService} from './store.service';
import {User} from '../domain/user';

@Injectable()
export class PersonaService {

  license = localStorage.getItem('license');
  client = localStorage.getItem('client');
  user: User;
  basePathCore = 'core/';
  basePathHigea = `${this.license}/`;
  uriRegistration = `${this.basePathCore}users/registration`;
  externalUriRegistration = `${this.basePathHigea}paciente/${this.client}`;

  constructor(private api: ApiService, private storeService: StoreService) {
  }

  create(persona: Persona) {

    let promises;

    if (this.license === 'core') {
      promises = [
        this.api.post(this.uriRegistration, persona, false)
      ];
    } else {
      promises = [
        this.api.post(this.uriRegistration, persona, false),
        this.api.post(this.externalUriRegistration, persona, false)
      ];
    }

    // serialize and return
    return promises.reduce((m, p: any) => m.then(v => {
        if (p === 'function') {
          Promise.all([...v, p()])
        } else {
          Promise.all([...v, p])
        }
      }
    ), Promise.resolve([]));

  }

  validateDni(dto: any) {
    const path = `${this.basePathCore}persona/afip?documento=${dto.documento}&nombre=${dto.nombre}&apellido=${dto.apellido}&genero=${dto.genero}`;

    return this.api.get(path, false);
  }

  getIntegrantes() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    if (!this.user.email) {
      return;
    }

    const path = `${this.basePathCore}persona/email?email=${this.user.email}`;

    return this.api.get(path)
      .then((data) => {
        this.buildIntegrantes(data);
      });
  }

  buildIntegrantes(data) {
    const userPersona: Persona = data;
    const personas: Persona[] = [];
    personas.push(userPersona);
    if (data.integrantes) {
      data.integrantes.forEach(x => {
        personas.push(x);
      });
    }

    userPersona.userAsociado.token = this.user.token;
    localStorage.setItem('currentUser', JSON.stringify(userPersona.userAsociado));
    this.storeService.update('integrantes', personas);
    this.storeService.update('persona', userPersona);
  }

  updatePersonaUser(persona: Persona) {
    const path = this.basePathCore + 'persona';
    let promises;

    if (this.license === 'core') {
      promises = [
        this.api.post(path, persona).then(() => {
          this.buildIntegrantes(persona)
        })
      ];
    } else {
      promises = [

        this.api.post(path, persona, false).then(() => {
          this.buildIntegrantes(persona)
        }),
        this.api.post(this.externalUriRegistration, persona, false).then(() => {
          this.buildIntegrantes(persona)
        })
      ];
    }

    // serialize and return
    return promises.reduce((m, p: any) => m.then(v => Promise.all([...v, p()])), Promise.resolve([]));
  }

  activateUser(token) {
    const path = `${this.basePathCore}users/regitrationConfirm?token=${token}`;
    return this.api.get(path);
  }

}
