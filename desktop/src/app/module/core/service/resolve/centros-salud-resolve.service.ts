import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Persona} from '../../domain/persona';
import {PersonaService} from '../persona.service';
import {CentroSalud} from '../../domain/centro-salud';
import {TurnoService} from '../turno.service';

@Injectable()
export class CentrosSaludResolveService implements Resolve<CentroSalud[]> {

  constructor(private turnoService: TurnoService) {
  }

  resolve(): Promise<CentroSalud[]> {
    return this.turnoService.getCentrosDeSalud();
  }

}
