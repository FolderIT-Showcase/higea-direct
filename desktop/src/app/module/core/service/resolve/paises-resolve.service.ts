import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {MetadataService} from '../metadata.service';
import {Metadata} from '../../domain/metadata';
import {StoreService} from '../store.service';
import {LoadingService} from '../loading.service';

@Injectable()
export class PaisesResolveService implements Resolve<Metadata> {

  constructor(private metadataService: MetadataService,
              private storeService: StoreService,
              private loadingService: LoadingService) {
  }

  resolve(): Promise<Metadata> {
    const paises = this.storeService.get('paises');
    if (paises[0]) {
      return new Promise((resolve, reject) => {
        resolve(paises);
      });
    }
    this.loadingService.start();
    return this.metadataService.getPaises()
      .then(() => {
        this.loadingService.finish();
      });
  }

}
