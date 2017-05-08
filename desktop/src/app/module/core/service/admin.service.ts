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

  getProfesionales() {
    const path = 'profesional';
    return this.api.get(path)
      .do(data => {
        this.storeService.update('profesionales', data);
      })
      .first().toPromise();
  }

  saveEspecialidad(especialidad: Especialidad) {
    const path = 'especialidad';
    return this.api.put(path, especialidad)
      .do(data => {
        // this.storeService.update('profesionales', data);
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

  saveCentroSalud(centroSalud: CentroSalud) {
    const path = 'centroSalud';
    return this.api.put(path, centroSalud)
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

  saveProfesional(profesional: Profesional) {
    const path = 'profesional';
    return this.api.put(path, profesional)
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

  deleteCentroSalud(centro: CentroSalud) {
    const path = 'centroSalud';
    return this.api.delete(path + '?id=' + centro.id)
      .do(data => {
        // this.storeService.update('profesionales', data);
      })
      .first().toPromise();
  }

  getTurnos() {
    const path = 'turno';
    return this.api.get(path)
      .do(data => {
        this.storeService.update('turnos', data);
      })
      .first().toPromise();
  }

  deleteTurno(turno: Turno) {
    const path = 'turno';
    return this.api.delete(path + '?id=' + turno.id + '&desactivate=true')
      .do(data => {
        // this.storeService.update('profesionales', data);
      })
      .first().toPromise();
  }

}
