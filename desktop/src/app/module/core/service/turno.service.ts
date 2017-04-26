import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {CentroSalud} from '../domain/centro-salud';
import {Especialidad} from '../domain/especialidad';
import {Profesional} from '../domain/profesional';
import {StoreService} from './store.service';
import {FiltroTurno} from '../domain/filter-turno';

@Injectable()
export class TurnoService {

  constructor(private api: ApiService, private storeService: StoreService) {
  }

  getCentrosDeSalud() {
    const path = 'centroSalud';
    return this.api.get(path)
      .do(data => {
        this.storeService.update('centrosSalud', data);
      })
      .first().toPromise();
  }

  getTurnos(centro: CentroSalud, especialidad: Especialidad, profesional: Profesional, fecha: Date) {
    const path = ''; // TODO: a ser definido

    const filtro = new FiltroTurno;
    filtro.centroSalud = centro;
    filtro.profesional = profesional;
    filtro.especialidad = especialidad;
    filtro.fecha = fecha;

    return this.api.post(path, filtro)
      .do(data => {
        this.storeService.update('CentroSalud', centro);
        this.storeService.update('turnos', data);
      })
      .first().toPromise();
  }

}
