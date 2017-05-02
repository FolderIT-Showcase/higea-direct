import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {TurnoService} from '../turno.service';
import {StoreService} from 'app/module/core/service/store.service';
import {LoadingService} from '../loading.service';

@Injectable()
export class CentrosSaludResolveService implements Resolve<any> {

  constructor(private turnoService: TurnoService,
              private storeService: StoreService,
              private loadingService: LoadingService) {
  }

  resolve(): Promise<any> {
    const centro = this.storeService.get('centrosSalud');
    if (centro[0]) {
      return new Promise((resolve, reject) => {
        resolve(centro);
      });
    }
    this.loadingService.start();
    return this.turnoService.getCentrosDeSalud()
      .then(() => {
        this.loadingService.finish();
      });
  }

}
