import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {MetadataService} from '../metadata.service';
import {LoadingService} from '../loading.service';

@Injectable()
export class TipoTurnoResolveService implements Resolve<any> {

  constructor(private metadataService: MetadataService,
              private loadingService: LoadingService) {
  }

  resolve(): Promise<any> {
    return this.metadataService.requestTiposTurnos();
  }

}
