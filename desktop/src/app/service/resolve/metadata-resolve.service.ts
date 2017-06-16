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
    let metadata: Metadata = new Metadata;
    metadata.paises = await this.metadataService.getPaises();
    metadata.provincias = await this.metadataService.getProvincias();
    metadata.localidades = await this.metadataService.getLocalidades();
    metadata.obrasSociales = await this.metadataService.getObrasSociales();
    metadata.tipoTurnos = await this.metadataService.getAllTiposTurnos();
    // metadata.estadosCiviles = await this.metadataService.getAllEstadoCiviles();
    metadata.motivos = await this.metadataService.getMotivosTurno();
    this.storeService.update('metadata', metadata);
    return new Promise<any>((resolve, reject) => {
      resolve(0);
    })
  }

  // resolve() {
  //   let metadata: Metadata = new Metadata;
  //
  //   return this.metadataService.getPaises()
  //     .then(paises => {
  //       metadata.paises = paises;
  //       return this.metadataService.getProvincias();
  //     })
  //     .then(provincias => {
  //       metadata.provincias = provincias;
  //       return this.metadataService.getLocalidades();
  //     })
  //     .then(localidades => {
  //       metadata.localidades = localidades;
  //       return this.metadataService.getObrasSociales();
  //     })
  //     .then(os => {
  //       metadata.obrasSociales = os;
  //       return this.metadataService.getAllTiposTurnos();
  //     })
  //     .then(tipoTurnos => {
  //       metadata.tipoTurnos = tipoTurnos;
  //       return this.metadataService.getMotivosTurno();
  //     })
  //     .then(motivos => {
  //       metadata.motivos = motivos;
  //     })
  //     .then(() => this.storeService.update('metadata', metadata));
  // }

}
