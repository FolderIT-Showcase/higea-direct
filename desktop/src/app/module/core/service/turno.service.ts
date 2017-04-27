import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {CentroSalud} from '../domain/centro-salud';
import {Especialidad} from '../domain/especialidad';
import {Profesional} from '../domain/profesional';
import {StoreService} from './store.service';
import {FiltroTurno} from '../domain/filter-turno';
import {Turno} from '../domain/turno';

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

    const path = 'turno';
    const filtro = new FiltroTurno;
    if (centro) {
      const tmpCentro: CentroSalud = new CentroSalud();
      Object.assign(tmpCentro, centro);
      filtro.centroSalud = tmpCentro;
      filtro.centroSalud.nombre = null;
      filtro.centroSalud.especialidad = null;
    }
    if (profesional) {
      const tmpProfesional: Profesional = new Profesional();
      Object.assign(tmpProfesional, profesional);
      filtro.profesional = tmpProfesional;
      filtro.profesional.nombre = null;
      filtro.profesional.apellido = null;
    }
    if (especialidad) {
      filtro.especialidad = especialidad;
    }

    filtro.fecha = fecha;

    return this.api.post(path, filtro)
      .do(data => {
        this.storeService.update('CentroSalud', centro);
        this.storeService.update('turnos', data);
      })
      .first().toPromise();
  }

  saveTurno(centro: CentroSalud, especialidad: Especialidad, profesional: Profesional, fecha: Date, hora: Date) {
    const path = 'turno'; // TODO: a ser definido

    const turno = new Turno();
    turno.fecha = fecha.toString();
    turno.hora = hora.toString();
    turno.centroSalud = centro;
    turno.especialidad = especialidad;
    turno.profesional = profesional;

    return this.api.put(path, turno)
      .do(data => {
        this.storeService.update('CentroSalud', centro);
        this.storeService.update('turnos', data);
      })
      .first().toPromise();
  }

}
