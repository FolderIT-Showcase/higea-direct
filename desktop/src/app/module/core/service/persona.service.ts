import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Persona} from '../domain/persona';
import {TipoDocumentoEnum, TipoDocumentoLabel} from '../domain/enums/tipo-documento';

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

  constructor(private api: ApiService) {
  }

  create(persona: Persona) {
    return this.api.post('users/registration', persona).first().toPromise();
  }

  // TODO: cambiar sexo por genero, frontend y backend
  validateDni(documento: string, nombre: string, apellido: string, sexo: string) {
    const path = '/persona/afip';
    const search: URLSearchParams = new URLSearchParams();

    search.set('documento', documento);
    search.set('nombre', nombre);
    search.set('apellido', apellido);
    search.set('sexo', sexo);

    return this.api.get(path, search).first().toPromise();
  }


}
