import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Persona} from '../domain/persona';
import {TipoDocumentos} from '../domain/enums/tipo-documento';
import {StoreService} from './store.service';
import {User} from '../domain/user';

@Injectable()
export class PersonaService {

  user: User;

  public static convertTipoDocumento(tipo: string): string {
    const tipoRtn = TipoDocumentos.export().find(x => x.label === tipo);
    if (tipoRtn) {
      return tipoRtn.id;
    } else {
      return tipo;
    }
  }

  constructor(private api: ApiService, private storeService: StoreService) {
  }

  create(persona: Persona) {
    return this.api.post('users/registration', persona, false);
  }

  validateDni(dto: any) {
    const path = 'persona/afip' +
      '?documento=' + dto.documento +
      '&nombre=' + dto.nombre +
      '&apellido=' + dto.apellido +
      '&genero=' + dto.genero;

    return this.api.get(path, false);
  }

  getIntegrantes() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    if (!this.user.email) {
      return;
    }

    const path = 'persona/email?email=' + this.user.email;

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
    const path = 'persona';
    return this.api.post(path, persona)
      .then(() => {
        this.buildIntegrantes(persona);
      });
  }

  activateUser(token) {
    const path = 'users/regitrationConfirm?token=' + token;
    return this.api.get(path);
  }

}
