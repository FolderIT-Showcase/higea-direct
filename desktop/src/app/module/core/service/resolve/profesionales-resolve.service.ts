import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {CentroSalud} from '../../domain/centro-salud';
import {TurnoService} from '../turno.service';
import {StoreService} from 'app/module/core/service/store.service';
import {LoadingService} from '../loading.service';
import {AdminService} from "../admin.service";

@Injectable()
export class ProfesionalResolveService implements Resolve<any> {

  constructor(private adminService: AdminService,
              private storeService: StoreService,
              private loadingService: LoadingService) {
  }

  resolve(): Promise<any> {
    const profesional = this.storeService.get('profesionales');
    if (profesional && profesional[0]) {
      return new Promise((resolve, reject) => {
        resolve(profesional);
      });
    }
    this.loadingService.start();
    return this.adminService.getProfesionales()
      .then(() => {
        this.loadingService.finish();
      })
      .catch(error => {
        this.loadingService.finish();
        console.error(error);
      })
  }

}
