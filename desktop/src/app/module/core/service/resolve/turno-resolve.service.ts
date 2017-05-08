import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {LoadingService} from '../loading.service';
import {TurnoService} from '../turno.service';

@Injectable()
export class TurnoResolveService implements Resolve<any> {

  constructor(private turnoService: TurnoService, private loadingService: LoadingService) {
  }

  resolve(): Promise<any> {
    this.loadingService.start();
    return this.turnoService.getAllTurnos()
      .then(() => {
        this.loadingService.finish();
      })
      .catch(error => {
        this.loadingService.finish();
        console.error(error);
      })
  }

}
