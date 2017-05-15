import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Pais} from '../domain/pais';
import {Provincia} from '../domain/provincia';
import {Localidad} from '../domain/localidad';
import {LoadingService} from './loading.service';
import {Store} from './store';

@Injectable()
export class MetadataService {

  paises: Pais[] = [];
  provincias: Provincia[] = [];
  localidades: Localidad[] = [];

  constructor(private api: ApiService,
              private store: Store,
              private loadingService: LoadingService) {
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
    const path = 'pais';
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
    const path = 'provincia';
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
    const path = 'localidad';
    return this.api.get(path);
  }

  setLocalidades(mLocalidades) {
    this.localidades = mLocalidades.sort((a, b) => {
      return (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0);
    });
    this.store.db.setItem('localidades', this.localidades);
  }

}
