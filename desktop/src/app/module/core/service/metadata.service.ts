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
    params.set('locale', 'en_US');
    return this.api.get(this.path).do((response: Metadata) => {
      this.storeHelper.merge(response);
    });
  }

}
