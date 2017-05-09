import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {MetadataService} from '../metadata.service';
import {StoreService} from '../store.service';
import {LoadingService} from '../loading.service';

@Injectable()
export class LocalidadesResolveService implements Resolve<any> {

  constructor(private metadataService: MetadataService,
              private storeService: StoreService,
              private loadingService: LoadingService) {
  }

  resolve(): Promise<any> {
    const localidades = this.storeService.get('localidades');
    if (localidades[0]) {
      return new Promise((resolve, reject) => {
        resolve(localidades);
      });
    }
    this.loadingService.start();
    return this.metadataService.getLocalidades()
      .then(() => {
        this.loadingService.finish();
      })
      .catch(() => {
        this.loadingService.finish();
      });
  }

}
