import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Pais} from '../domain/pais';
import {Provincia} from '../domain/provincia';
import {Localidad} from '../domain/localidad';
import {Store} from './store';
import {ObraSocial} from '../domain/obra-social';
import {TipoTurno} from '../domain/tipo-turno';
import {EstadosCiviles} from '../domain/enums/estado-civil';
import {Generos} from '../domain/enums/genero';

@Injectable()
export class MetadataService {

  paises: Pais[] = [];
  provincias: Provincia[] = [];
  localidades: Localidad[] = [];
  obras_sociales: ObraSocial[] = [];
  tipos_turnos: TipoTurno[] = [];
  estados_civil: EstadosCiviles[] = [];
  license = localStorage.getItem('license');
  client = localStorage.getItem('client');
  basePath = `${this.license}/${this.client}/`;

  constructor(private api: ApiService,
              private store: Store) {

    if (this.license === 'core') {
      this.basePath = this.license + '/';
    }

  }

  getPaises() {
    return this.store.db.getItem('paises')
      .then(data => {
        if (data && data[0]) {
          return new Promise<any>((resolve, reject) => {
            resolve(data);
          });
        }
        return this.requestPaises();
      })
      .then(data => {
        this.setPaises(data);
        return new Promise<any>((resolve, reject) => {
          resolve(data);
        });
      });
  }

  requestPaises() {
    const path = this.basePath + 'pais';
    return this.api.get(path);
  }

  setPaises(mPaises) {
    this.paises = mPaises.sort((a, b) => {
      return (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0);
    });
    this.store.db.setItem('paises', this.paises);
  }

  getProvincias() {
    return this.store.db.getItem('provincias')
      .then(data => {
        if (data && data[0]) {
          return new Promise<any>((resolve, reject) => {
            resolve(data);
          });
        }
        return this.requestProvincias();
      })
      .then(data => {
        this.setProvincias(data);
        return new Promise<any>((resolve, reject) => {
          resolve(data);
        });
      });
  }

  requestProvincias() {
    const path = this.basePath + 'provincia';
    return this.api.get(path);
  }

  setProvincias(mProvincias) {
    this.provincias = mProvincias.sort((a, b) => {
      return (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0);
    });
    this.store.db.setItem('provincias', this.provincias);
  }

  getLocalidades(): Promise<any> {
    return this.store.db.getItem('localidades')
      .then((data: any) => {
        if (data && data[0]) {
          return new Promise<any>((resolve, reject) => {
            resolve(data);
          });
        }
        return this.requestLocalidades();
      })
      .then(data => {
        this.setLocalidades(data);
        return new Promise<any>((resolve, reject) => {
          resolve(data);
        });
      });
  }

  requestLocalidades() {
    const path = this.basePath + 'localidad';
    return this.api.get(path);
  }

  setLocalidades(mLocalidades) {
    this.localidades = mLocalidades.sort((a, b) => {
      return (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0);
    });
    this.store.db.setItem('localidades', this.localidades);
  }uriRegistration = this.basePath + 'users/registration';

  getObrasSociales(): Promise<any> {
    return this.store.db.getItem('obras_sociales')
      .then((data: any) => {
        if (data && data[0]) {
          return new Promise<any>((resolve, reject) => {
            resolve(data);
          });
        }
        return this.requestObrasSociales();
      })
      .then(data => {
        this.setObrasSociales(data);
        return new Promise<any>((resolve, reject) => {
          resolve(data);
        });
      });
  }

  requestObrasSociales() {
    const path = this.basePath + 'obraSocial';
    return this.api.get(path);
  }

  setObrasSociales(mOS) {
    this.obras_sociales = mOS.sort((a, b) => {
      return (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0);
    });
    this.store.db.setItem('obras_sociales', this.obras_sociales);
  }

  getAllTiposTurnos(): Promise<any> {
    return this.store.db.getItem('tipos_turnos')
      .then((data: any) => {
        if (data && data[0]) {
          return new Promise<any>((resolve, reject) => {
            resolve(data);
          });
        }
        return this.requestTiposTurnos();
      })
      .then(data => {
        this.setTipoTurnos(data);
         return new Promise<any>((resolve, reject) => {
          resolve(data);
        });
      });
  }

  requestTiposTurnos() {
    const path = this.basePath + 'tipoTurno';
    return this.api.get(path);
  }

  setTipoTurnos(mTT) {
    this.tipos_turnos = mTT.sort((a, b) => {
      return (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0);
    });
    this.store.db.setItem('tipos_turnos', this.tipos_turnos);
  }

  getAllEstadoCiviles(): Promise<any> {
    //if(this.license==='core') return new Promise<any> (Generos.build());
    return this.store.db.getItem('estado_civil')
      .then((data: any) => {
        if (data && data[0]) {
          return new Promise<any>((resolve, reject) => {
            resolve(data);
          });
        }
        return this.requestEstadoCivil();
      })
      .then(data => {
        this.setEstadoCivil(data);
         return new Promise<any>((resolve, reject) => {
          resolve(data);
        });
      });
  }

  requestEstadoCivil() {
    const path = this.basePath + 'estadoCivil';
    return this.api.get(path);
  }

  setEstadoCivil(estado) {
    this.estados_civil = estado.sort((a, b) => {
      return (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0);
    });
    this.store.db.setItem('estado_civil', this.estados_civil);
  }

}