import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {centroSalud} from '../domain/centro-salud';
import {Especialidad} from '../domain/especialidad';
import {Profesional} from '../domain/profesional';
import {StoreService} from './store.service';
import {FiltroTurno} from '../domain/filter-turno';

@Injectable()
export class TurnoService {

  constructor(private api: ApiService, private storeService: StoreService) {
  }

  getCentrosDeSalud() {
    const path = ''; // TODO: a ser definido
    return this.api.get(path).first().toPromise();
  }

  getEspecialidades() {
    const path = ''; // TODO: a ser definido
    return this.api.get(path).first().toPromise();
  }

  getProfesionales() {
    const path = ''; // TODO: a ser definido
    return this.api.get(path).first().toPromise();
  }

  getTurnos(centro: centroSalud, especialidad: Especialidad, profesional: Profesional, fecha: Date) {
    const path = ''; // TODO: a ser definido

    const filtro = new FiltroTurno;
    filtro.centroSalud = centro;
    filtro.profesional = profesional;
    filtro.especialidad = especialidad;
    filtro.fecha = fecha;

    return this.api.post(path, filtro)
      .do(data => {
        this.storeService.update('centroSalud', centro);
        this.storeService.update('turnos', data);
      })
      .first().toPromise();
  }

}
