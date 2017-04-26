import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {MetadataService} from '../metadata.service';
import {Metadata} from '../../domain/metadata';
import {StoreService} from '../store.service';

@Injectable()
export class PaisesResolveService implements Resolve<Metadata> {

  constructor(private metadataService: MetadataService, private storeService: StoreService) {
  }

  resolve(): Promise<Metadata> {
    const paises = this.storeService.get('paises');
    if (paises[0]) {
      return new Promise((resolve, reject) => {
        resolve(paises);
      });
    } else {
      return this.metadataService.getPaises();
    }
  }

}
