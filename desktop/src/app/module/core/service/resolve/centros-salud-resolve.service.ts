import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {TurnoService} from '../turno.service';

@Injectable()
export class CentrosSaludResolveService implements Resolve<any> {

  constructor(private turnoService: TurnoService) {
  }

  resolve(): Promise<any> {
    return this.turnoService.getCentrosDeSalud();
  }

}
