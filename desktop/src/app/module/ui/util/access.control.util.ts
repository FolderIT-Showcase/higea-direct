import {Injectable} from '@angular/core';
import {MetadataService} from '../../../service/metadata.service';

@Injectable()
export class AccessControlUtil {

  parametrosWeb = [];

  PACIENTES_POST = 'WEB_API_ENDPOINT_POST_PACIENTES';

  constructor(private metadataService: MetadataService) {
    this.metadataService.getParametrosWeb().then((data: any) => this.parametrosWeb = data);
  }

  isEnableFor(propiedad: string) {
    return this.parametrosWeb.find(x => x.parweb_propiedad === propiedad).parweb_valor === 'S';
  }


}
