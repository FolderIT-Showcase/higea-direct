import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {LoadingService} from '../loading.service';
import {MetadataService} from '../metadata.service';

@Injectable()
export class ObraSocialResolveService implements Resolve<any> {

  constructor(private metadataService: MetadataService,
              private loadingService: LoadingService) {
  }

  resolve(): Promise<void> {
    return this.metadataService.getLocalidades();
  }

}
