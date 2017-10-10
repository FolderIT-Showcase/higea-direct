import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {CentroSalud} from '../domain/centro-salud';
import {Especialidad} from '../domain/especialidad';
import {Profesional} from '../domain/profesional';
import {StoreService} from './store.service';
import {FiltroTurno} from '../domain/filter-turno';
import {Persona} from '../domain/persona';
import {Turno} from '../domain/turno';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class TurnoService {

  license = localStorage.getItem('license');
  client = localStorage.getItem('client');
  pathManagment = `core/`;
  pathTurno = `${this.license}/turnos/${this.client}`;
  pathCentroSalud = `${this.license}/centroSalud/${this.client}`;
  pathPersona = `${this.license}/persona/${this.client}`;

  basePath = `${this.license}/`;
  // VARIABLE TO RESET TURNO FORM
  resetValue = new Subject();

  constructor(private api: ApiService, private storeService: StoreService) {
    if (this.license === 'core') {
      this.pathTurno = this.license + '/turnos';
      this.pathCentroSalud = this.license + '/centroSalud';
      this.pathPersona = this.license + '/persona';
    }
  }

  set resetForm(value) {
    this.resetValue.next(value); // this will make sure to tell every subscriber about the change.
    localStorage.setItem('resetForm', value);
  }

  getCentrosDeSalud() {
    if (this.license !== 'core') {
      return new Promise<any>((resolve, reject) => {
        resolve('OK');
      });
    }

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

  getTurnos(centro: CentroSalud, especialidad: Especialidad, profesional: Profesional, fecha) {

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

    return this.api.post(path, filtro, false)
      .then(data => {
        this.storeService.update('CentroSalud', centro);
        this.storeService.update('turnos', data);
      });
  }

  getTurnoByPersonaId(id: number) {
    const path = `${this.license}/turnos/${this.client}/persona/${id}`;

    console.log('getTurnosByPersonaId: Path= ' + path);

    return this.api.get(path, false);
  }

  getProximosTurnos(centro: CentroSalud, especialidad: Especialidad, profesional: Profesional) {

    const path = this.pathTurno + '/proximo';
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

    return this.api.post(path, filtro)
      .then(data => {
        this.storeService.update('CentroSalud', centro);
        this.storeService.update('turnos', data);
      });
  }

  reservarTurno(turno: Turno, persona: Persona) {
    const path = `${this.pathTurno}/persona/${persona.externalId}`;
    return this.api.post(path, turno, false);
  }

  generarPDF(persona: Persona) {
    const path = 'core/' + 'persona/pdf';
    return this.api.getFile(path, 'application/pdf', 'preparacion', persona);
  }

  generarTurnoPDF(turno: Turno) {
    const path = 'core/' + 'turno/pdf';
    return this.api.getFile(path, 'application/pdf', 'preparacion', turno);
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

  getCalendario(profesional: Profesional, fecha: any) {
    const path = this.pathTurno + '/calendarios?profesional_id=' + profesional.id
      + '&calendario_fecha=' + fecha
      + '&servicio_id=' + profesional.servicioId;

    return this.api.get(path, false);
  }

  requestCondicional(data, fecha) {
    const path = this.pathManagment + 'managment/sobreturno?nombre=' + data.nombre + '&apellido=' + data.apellido +
      '&email=' + data.email + '&telefono=' + data.telefono + '&fecha=' + fecha;
    return this.api.post(path, null, false);
  }

}
