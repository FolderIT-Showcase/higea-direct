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
    return this.api.delete(path + '?id=' + turno.id + '&desactivate=true')
      .do(data => {
        // this.storeService.update('profesionales', data);
      })
      .first().toPromise();
  }

  saveTurno(centro: CentroSalud, especialidad: Especialidad, profesional: Profesional, fecha: Date, hora: Date, obs: string) {
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
      .do(data => {
        this.storeService.update('CentroSalud', centro);

        this.storeService.add('turnos', data);
      })
      .first().toPromise();
  }

  // especialidad

  saveEspecialidad(especialidad: Especialidad) {
    const path = 'especialidad';
    return this.api.post(path, especialidad)
      .do(data => {
        this.storeService.add('especialidades', especialidad);
      })
      .first().toPromise();
  }

  getEspecialidades() {
    const path = 'especialidad';
    return this.api.get(path)
      .do(data => {
        this.storeService.update('especialidades', data);
      })
      .first().toPromise();
  }

  deleteEspecialidad(especialidad: Especialidad) {
    const path = 'especialidad' + '?id=' + especialidad.id;
    return this.api.delete(path)
      .do(data => {
      })
      .first().toPromise();
  }

  updateEspecialidad(especialidad: Especialidad) {
    const path = 'especialidad';
    return this.api.put(path, especialidad)
      .do(data => {
        this.storeService.findAndSet('centrosSalud', especialidad.id, especialidad);
      })
      .first().toPromise();
  }

  // centros de salud

  saveCentroSalud(centroSalud: CentroSalud) {
    const path = 'centroSalud';
    return this.api.post(path, centroSalud)
      .do(data => {
        this.storeService.add('centrosSalud', centroSalud);
      })
      .first().toPromise();
  }


  updateCentroSalud(centroSalud: CentroSalud) {
    const path = 'centroSalud';
    return this.api.put(path, centroSalud)
      .do(data => {
        this.storeService.findAndSet('centrosSalud', centroSalud.id, centroSalud);
      })
      .first().toPromise();
  }

  deleteCentroSalud(centro: CentroSalud) {
    const path = 'centroSalud';
    return this.api.delete(path + '?id=' + centro.id)
      .do(data => {
        // this.storeService.update('profesionales', data);
      })
      .first().toPromise();
  }

  // profesionales

  getProfesionales() {
    const path = 'profesional';
    return this.api.get(path)
      .do(data => {
        this.storeService.update('profesionales', data);
      })
      .first().toPromise();
  }

  saveProfesional(profesional: Profesional) {
    const path = 'profesional';
    return this.api.post(path, profesional)
      .do(data => {
        this.storeService.add('profesionales', profesional);
      })
      .first().toPromise();
  }

  updateProfesional(profesional: Profesional) {
    const path = 'profesional';
    return this.api.put(path, profesional)
      .do(data => {
        this.storeService.add('profesionales', profesional);
      })
      .first().toPromise();
  }


  deleteProfesional(profesional: Profesional) {
    const path = 'profesional';
    return this.api.delete(path + '?id=' + profesional.id)
      .do(data => {
        // this.storeService.update('profesionales', data);
      })
      .first().toPromise();
  }

}
