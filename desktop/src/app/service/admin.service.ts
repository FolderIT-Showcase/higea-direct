import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {StoreService} from './store.service';
import {Especialidad} from '../domain/especialidad';
import {CentroSalud} from '../domain/centro-salud';
import {Profesional} from '../domain/profesional';
import {Turno} from '../domain/turno';
import {MotivoTurno} from '../domain/motivo-turno';
import {Preparacion} from '../domain/preparacion';

@Injectable()
export class AdminService {

  license = localStorage.getItem('license');
  client = localStorage.getItem('client');
  pathTurno = this.license + '/turno/' + this.client;
  pathEspecialidad = this.license + '/especialidad/' + this.client;
  pathProfesional = this.license + '/profesional/' + this.client;

  constructor(private api: ApiService, private storeService: StoreService) {
    if (this.license === 'core') {
      this.pathTurno = this.license + '/turno';
      this.pathEspecialidad = this.license + '/especialidad';
      this.pathProfesional = this.license + '/profesional';
    }
  }

  // turnos

  deleteTurno(turno: Turno) {
    return this.api.delete(this.pathTurno + '?id=' + turno.id + '&desactivate=true');
  }

  saveTurno(centro: CentroSalud, especialidad: Especialidad, profesional: Profesional,
            fecha: number, hora: Date, obs: string, motivo: MotivoTurno, preparacion: string, objectPrep: Preparacion) {

    const turno = new Turno();
    turno.dia = fecha;
    turno.fecha = fecha;
    turno.hora = hora;
    turno.centroSalud = centro;
    turno.especialidad = especialidad;
    turno.profesional = profesional;
    turno.observaciones = obs;

    let prep;
    if (objectPrep) {
      prep = objectPrep
    } else {
      prep = new Preparacion();
    }

    prep.descripcion = preparacion;
    motivo.preparacion = prep;

    turno.motivoTurno = motivo;

    return this.api.put(this.pathTurno, turno)
      .then(data => {
        this.storeService.update('CentroSalud', centro);
        this.storeService.add('turnos', data);
      });
  }

  // especialidad

  saveEspecialidad(especialidad: Especialidad) {
    return this.api.post(this.pathEspecialidad, especialidad)
      .then(data => {
        this.storeService.add('especialidades', especialidad);
      });
  }

  getEspecialidades() {
    return this.api.get(this.pathEspecialidad)
      .then(data => {
        this.storeService.update('especialidades', data);
      });
  }

  deleteEspecialidad(especialidad: Especialidad) {
    const path = this.pathEspecialidad + '?id=' + especialidad.id;
    return this.api.delete(path);
  }

  updateEspecialidad(especialidad: Especialidad) {
    return this.api.put(this.pathEspecialidad, especialidad)
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
    return this.api.get(this.pathProfesional)
      .then(data => {
        this.storeService.update('profesionales', data);
      });
  }

  saveProfesional(profesional: Profesional) {
    return this.api.post(this.pathProfesional, profesional)
      .then(data => {
        this.storeService.add('profesionales', profesional);
      });
  }

  updateProfesional(profesional: Profesional) {
    return this.api.put(this.pathProfesional, profesional)
      .then(data => {
        this.storeService.add('profesionales', profesional);
      });
  }

  deleteProfesional(profesional: Profesional) {
    const path = this.pathProfesional + '?id=' + profesional.id;
    return this.api.delete(path);
  }

}
