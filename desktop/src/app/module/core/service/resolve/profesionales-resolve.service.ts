import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {TurnoService} from '../turno.service';
import {Profesional} from '../../domain/profesional';

@Injectable()
export class ProfesionalesResolveService implements Resolve<Profesional[]> {

  constructor(private turnoService: TurnoService) {
  }

  resolve(): Promise<Profesional[]> {
    return this.turnoService.getEspecialidades();
  }

}
