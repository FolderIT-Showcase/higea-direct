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

  license = localStorage.getItem('license');
  client = localStorage.getItem('client');
  pathTurno = this.license + '/turnos/' + this.client;
  pathCentroSalud = this.license + '/centroSalud/' + this.client;
  pathPersona = this.license + '/persona/' + this.client;

  basePath = 'core/';


  constructor(private api: ApiService,
              private storeService: StoreService) {
    if (this.license === 'core') {
      this.pathTurno = this.license + '/turnos';
      this.pathCentroSalud = this.license + '/centroSalud';
      this.pathPersona = this.license + '/persona';
    }
  }

  getCentrosDeSalud() {
    const path = this.basePath + 'centroSalud';
    return this.api.get(path)
      .then(data => {
        this.storeService.update('centrosSalud', data);
      });
  }

  getAllTurnos() {
    const path = this.basePath + 'turno';
    return this.api.get(path)
      .then(data => {
        this.storeService.update('turnos', data);
      });
  }

  getTurnos(centro: CentroSalud, especialidad: Especialidad, profesional: Profesional, fecha: Date) {

    const path = this.pathTurno;
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
    const path = this.basePath + 'persona';
    return this.api.post(path, persona);
  }

  cancelarTurno(turno: Turno, persona: Persona) {
    const path = this.basePath + 'turno?id=' + turno.id + '&desactivate=false';
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
