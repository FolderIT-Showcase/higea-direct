import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {MetadataService} from '../metadata.service';
import {Metadata} from '../../domain/metadata';

@Injectable()
export class PaisesResolveService implements Resolve<Metadata> {

  constructor(private metadataService: MetadataService) {
  }

  resolve(): Promise<Metadata> {
<<<<<<< Updated upstream:desktop/src/app/module/core/service/resolve/paises-resolve.service.ts
    return this.metadataService.getPaises();
=======
    return this.metadataService.getPaises().first().toPromise();
>>>>>>> Stashed changes:desktop/src/app/module/core/service/paises-resolve.service.ts
  }

}
