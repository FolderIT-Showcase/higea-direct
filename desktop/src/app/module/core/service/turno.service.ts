import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {CentroSalud} from '../domain/centro-salud';
import {Especialidad} from '../domain/especialidad';
import {Profesional} from '../domain/profesional';
import {StoreService} from './store.service';
import {FiltroTurno} from '../domain/filter-turno';
import {Persona} from '../domain/persona';
import {Turno} from '../domain/turno';

@Injectable()
export class TurnoService {

  constructor(private api: ApiService,
              private storeService: StoreService) {
  }

  getCentrosDeSalud() {
    const path = 'centroSalud';
    return this.api.get(path)
      .then(data => {
        this.storeService.update('centrosSalud', data);
      });
  }

  getAllTurnos() {
    const path = 'turno';
    return this.api.get(path)
      .then(data => {
        this.storeService.update('turnos', data);
      });
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
      .then(data => {
        this.storeService.update('CentroSalud', centro);
        this.storeService.update('turnos', data);
      });
  }

  reservarTurno(persona: Persona) {
    const path = 'persona';
    return this.api.post(path, persona);
  }

  cancelarTurno(turno: Turno, persona: Persona) {
    const path = 'turno?id=' + turno.id + '&desactivate=false';
    return this.api.delete(path)
      .then(() => {
        if (!persona) {
          return;
        }

        if (!persona.turno || persona.turno.length === 1) {
          persona.turno = [];
        } else {
          persona.turno = persona.turno.filter(x => x.id === turno.id);
        }
        this.storeService.update('persona', persona);
      });
  }

}
