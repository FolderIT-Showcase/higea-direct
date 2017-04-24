import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {StoreService} from './store.service';
import {Metadata} from '../domain/metadata';

@Injectable()
export class MetadataService {

  path = '/metadata';

  constructor(private storeHelper: StoreService, private api: ApiService) {
  }

  getMetadata() {
    const params = new URLSearchParams();
    return this.api.get(this.path).do((response: Metadata) => {
      this.storeHelper.merge(response);
    });
  }

  getPaises() {
    const path = '/pais';
    return this.api.get(this.path).do((response) => {
      this.storeHelper.update('paises', response);
    });
  }

  getProvincias() {
    const path = '/provincia';
    return this.api.get(this.path).do((response) => {
      this.storeHelper.update('provincias', response);
    });
  }

  getLocalidades() {
    const path = '/localidad';
    return this.api.get(this.path).do((response) => {
      this.storeHelper.update('localidades', response);
    });
  }

}
