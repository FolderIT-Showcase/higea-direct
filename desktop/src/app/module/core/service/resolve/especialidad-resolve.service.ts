import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {CentroSalud} from '../../domain/centro-salud';
import {TurnoService} from '../turno.service';
import {StoreService} from 'app/module/core/service/store.service';
import {LoadingService} from '../loading.service';
import {AdminService} from "../admin.service";

@Injectable()
export class EspecialidadResolveService implements Resolve<any> {

  constructor(private adminService: AdminService,
              private storeService: StoreService,
              private loadingService: LoadingService) {
  }

  resolve(): Promise<any> {
    const especialidad = this.storeService.get('especialidades');
    if (especialidad && especialidad[0]) {
      return new Promise((resolve, reject) => {
        resolve(especialidad);
      });
    }
    this.loadingService.start();
    return this.adminService.getEspecialidades()
      .then(() => {
        this.loadingService.finish();
      });
  }

}
