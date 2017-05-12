import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {StoreService} from './store.service';
import {Especialidad} from '../domain/especialidad';
import {AlertService} from './alert.service';
import {CentroSalud} from '../domain/centro-salud';
import {Profesional} from '../domain/profesional';
import {Turno} from '../domain/turno';

@Injectable()
export class AdminService {

  constructor(private api: ApiService,
              private storeService: StoreService, private alertService: AlertService) {
  }

  // turnos

  deleteTurno(turno: Turno) {
    const path = 'turno';
    return this.api.delete(path + '?id=' + turno.id + '&desactivate=true');
  }

  saveTurno(centro: CentroSalud, especialidad: Especialidad, profesional: Profesional, fecha: number, hora: Date, obs: string) {
    const path = 'turno';
    const turno = new Turno();
    turno.dia = fecha;
    turno.fecha = fecha;
    turno.hora = hora;
    turno.centroSalud = centro;
    turno.especialidad = especialidad;
    turno.profesional = profesional;
    turno.observaciones = obs;
    return this.api.put(path, turno)
      .then(data => {
        this.storeService.update('CentroSalud', centro);
        this.storeService.add('turnos', data);
      });
  }

  // especialidad

  saveEspecialidad(especialidad: Especialidad) {
    const path = 'especialidad';
    return this.api.post(path, especialidad)
      .then(data => {
        this.storeService.add('especialidades', especialidad);
      });
  }

  getEspecialidades() {
    const path = 'especialidad';
    return this.api.get(path)
      .then(data => {
        this.storeService.update('especialidades', data);
      });
  }

  deleteEspecialidad(especialidad: Especialidad) {
    const path = 'especialidad' + '?id=' + especialidad.id;
    return this.api.delete(path);
  }

  updateEspecialidad(especialidad: Especialidad) {
    const path = 'especialidad';
    return this.api.put(path, especialidad)
      .then(data => {
        this.storeService.findAndSet('centrosSalud', especialidad.id, especialidad);
      });
  }

  // centros de salud

  saveCentroSalud(centroSalud: CentroSalud) {
    const path = 'centroSalud';
    return this.api.post(path, centroSalud)
      .then(data => {
        this.storeService.add('centrosSalud', centroSalud);
      });
  }


  updateCentroSalud(centroSalud: CentroSalud) {
    const path = 'centroSalud';
    return this.api.put(path, centroSalud)
      .then(data => {
        this.storeService.findAndSet('centrosSalud', centroSalud.id, centroSalud);
      });
  }

  deleteCentroSalud(centro: CentroSalud) {
    const path = 'centroSalud';
    return this.api.delete(path + '?id=' + centro.id);
  }

  // profesionales

  getProfesionales() {
    const path = 'profesional';
    return this.api.get(path)
      .then(data => {
        this.storeService.update('profesionales', data);
      });
  }

  saveProfesional(profesional: Profesional) {
    const path = 'profesional';
    return this.api.post(path, profesional)
      .then(data => {
        this.storeService.add('profesionales', profesional);
      });
  }

  updateProfesional(profesional: Profesional) {
    const path = 'profesional';
    return this.api.put(path, profesional)
      .then(data => {
        this.storeService.add('profesionales', profesional);
      });
  }


  deleteProfesional(profesional: Profesional) {
    const path = 'profesional';
    return this.api.delete(path + '?id=' + profesional.id);
  }

}
