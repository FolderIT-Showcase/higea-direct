import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {centroSalud} from '../../domain/centro-salud';
import {TurnoService} from '../turno.service';

@Injectable()
export class CentrosSaludResolveService implements Resolve<centroSalud[]> {

  constructor(private turnoService: TurnoService) {
  }

  resolve(): Promise<centroSalud[]> {
    return this.turnoService.getCentrosDeSalud();
  }

}
