import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Persona} from '../domain/persona';
import {TipoDocumentoEnum, TipoDocumentoLabel} from '../domain/enums/tipo-documento';
import {StoreService} from './store.service';
import {User} from '../domain/user';

@Injectable()
export class PersonaService {

  public static convertTipoDocumento(tipo: string): string {

    switch (tipo) {
      case TipoDocumentoLabel.dni:
        tipo = TipoDocumentoEnum.dni;
        break;
      case TipoDocumentoLabel.cedulaIdentidad:
        tipo = TipoDocumentoEnum.cedulaIdentidad;
        break;
      case TipoDocumentoLabel.documentoExtranjero:
        tipo = TipoDocumentoEnum.documentoExtranjero;
        break;
      case TipoDocumentoLabel.libretaCivica:
        tipo = TipoDocumentoEnum.libretaCivica;
        break;
      case TipoDocumentoLabel.libretaEnrolamiento:
        tipo = TipoDocumentoEnum.libretaEnrolamiento;
        break;
      case TipoDocumentoLabel.pasaporte:
        tipo = TipoDocumentoEnum.pasaporte;
        break;
      default :
        break;
    }
    return tipo;
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

        this.storeService.update('integrantes', personas);
      })
      .first().toPromise();
  }


}
