import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {MetadataService} from '../metadata.service';
import {StoreService} from '../store.service';
import {Metadata} from '../../domain/metadata';

@Injectable()
export class MetadataResolveService implements Resolve<any> {

  constructor(private metadataService: MetadataService, private storeService: StoreService) {
  }

  async resolve() {
    const metadata: Metadata = new Metadata;
    //metadata.paises = await this.metadataService.getPaises();
    //metadata.provincias = await this.metadataService.getProvincias();
    //metadata.localidades = await this.metadataService.getLocalidades();
    metadata.obrasSociales = await this.metadataService.getObrasSociales();
    metadata.tipoTurnos = await this.metadataService.getAllTiposTurnos();
    metadata.motivos = await this.metadataService.getMotivosTurno();
    this.storeService.update('metadata', metadata);
    return new Promise<any>((resolve, reject) => {
      resolve(0);
    })
  }

}
