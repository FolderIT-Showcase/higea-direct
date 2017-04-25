import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {StoreService} from './store.service';

@Injectable()
export class MetadataService {

  constructor(private storeHelper: StoreService, private api: ApiService) {
  }

  getPaises() {
    const path = '/pais';
    return this.api.get(path).do((response) => {
      this.storeHelper.update('paises', response);
    });
  }

  getProvincias() {
    const path = '/provincia';
    return this.api.get(path).do((response) => {
      this.storeHelper.update('provincias', response);
    });
  }

  getLocalidades() {
    const path = '/localidad';
    return this.api.get(path).do((response) => {
      this.storeHelper.update('localidades', response);
    });
  }

}
