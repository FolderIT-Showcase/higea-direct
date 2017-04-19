import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {MetadataService} from './metadata.service';
import {Metadata} from '../domain/metadata';

@Injectable()
export class MetadataResolveService implements Resolve<Metadata> {

  constructor(private metadataService: MetadataService) {
  }

  resolve(): Promise<Metadata> {
    return this.metadataService.getMetadata().first().toPromise();
  }

}
