import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Especialidad} from '../../domain/especialidad';
import {TurnoService} from '../turno.service';

@Injectable()
export class EspecialidadesResolveService implements Resolve<Especialidad[]> {

  constructor(private turnoService: TurnoService) {
  }

  resolve(): Promise<Especialidad[]> {
    return this.turnoService.getEspecialidades();
  }

}
