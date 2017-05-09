import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Persona} from '../domain/persona';
import {TipoDocumentos} from '../domain/enums/tipo-documento';
import {StoreService} from './store.service';
import {User} from '../domain/user';

@Injectable()
export class PersonaService {

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
    return this.api.post('users/registration', persona, false).first().toPromise();
  }

  validateDni(dto: any) {
    const path = 'persona/afip' +
      '?documento=' + dto.documento +
      '&nombre=' + dto.nombre +
      '&apellido=' + dto.apellido +
      '&genero=' + dto.genero;

    return this.api.get(path, false).first().toPromise();
  }

  getIntegrantes() {
    const user: User = JSON.parse(localStorage.getItem('currentUser'));

    if (!user.email) {
      return;
    }

    const path = 'persona/email?email=' + user.email;
    return this.api.get(path)
      .do((data: Persona) => {
        const userPersona: Persona = data;
        userPersona.integrantes = null;
        const personas: Persona[] = [];
        personas.push(userPersona);
        if (data.integrantes) {
          data.integrantes.forEach(x => {
            personas.push(x);
          });
        }
        const mUser: User = JSON.parse(localStorage.getItem('currentUser'));
        userPersona.userAsociado.token = mUser.token;
        localStorage.setItem('currentUser', JSON.stringify(userPersona.userAsociado));
        this.storeService.update('integrantes', personas);
        this.storeService.update('persona', userPersona);
      })
      .first().toPromise();
  }

  updatePersonaUser(persona: Persona) {
    const path = 'persona';
    return this.api.post(path, persona).first().toPromise();
  }

  activateUser(token) {
    const path = 'api/users/regitrationConfirm?token=' + token;
    return this.api.get(path).first().toPromise();
  }

}
