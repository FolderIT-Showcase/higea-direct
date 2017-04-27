import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {CentroSalud} from '../../domain/centro-salud';
import {TurnoService} from '../turno.service';
import {StoreService} from 'app/module/core/service/store.service';

@Injectable()
export class CentrosSaludResolveService implements Resolve<CentroSalud[]> {

  constructor(private turnoService: TurnoService, private storeService: StoreService) {
  }

  resolve(): Promise<CentroSalud[]> {
    const centro = this.storeService.get('centrosSalud');
    if (centro[0]) {
      return new Promise((resolve, reject) => {
        resolve(centro);
      });
    }
    return this.turnoService.getCentrosDeSalud();
  }

}
