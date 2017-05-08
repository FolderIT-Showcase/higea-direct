import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {MetadataService} from '../metadata.service';
import {StoreService} from '../store.service';
import {LoadingService} from '../loading.service';

@Injectable()
export class ProvinciaResolveService implements Resolve<any> {

  constructor(private metadataService: MetadataService,
              private storeService: StoreService,
              private loadingService: LoadingService) {
  }

  resolve(): Promise<any> {
    const provincias = this.storeService.get('provincias');
    if (provincias[0]) {
      return new Promise((resolve, reject) => {
        resolve(provincias);
      });
    }
    this.loadingService.start();
    return this.metadataService.getProvincias()
      .then(() => {
        this.loadingService.finish();
      })
      .catch(() => {
        this.loadingService.finish();
      });
  }

}
