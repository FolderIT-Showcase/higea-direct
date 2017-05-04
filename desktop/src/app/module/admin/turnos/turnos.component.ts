import {Component, OnInit} from '@angular/core';
import {Turno} from '../../core/domain/turno';
import {Persona} from '../../core/domain/persona';
import {CentroSalud} from '../../core/domain/centro-salud';
import {Especialidad} from '../../core/domain/especialidad';
import {Profesional} from '../../core/domain/profesional';
import {AlertService} from '../../core/service/alert.service';
import {TurnoService} from '../../core/service/turno.service';
import {StoreService} from '../../core/service/store.service';

class Data {
  persona: Persona;
  centro: CentroSalud;
  especialidad: Especialidad;
  profesional: Profesional;
  fechaDesde: Date = new Date();
  hora: Date = new Date();
  observaciones: string;
}

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.scss']
})
export class TurnosComponent implements OnInit {

  turnos: Turno[] = [];
  model: Data = new Data();
  observaciones: string;
  centrosSalud: CentroSalud[] = [];
  especialidades: Especialidad[] = [];
  profesionales: Profesional[] = [];
  personas: Persona[] = [];

  constructor(private storeService: StoreService, private turnoService: TurnoService, private alertService: AlertService) {
  }

  ngOnInit() {
    this.centrosSalud = this.storeService.get('centrosSalud');
    this.model.fechaDesde = new Date();
    this.model.hora = new Date();
  }

  handlePersonaClick(persona: Persona) {
    this.model.persona = persona;
  }

  handleCentroSaludClick(centroSalud: CentroSalud) {
    this.model.centro = centroSalud;
    this.especialidades = centroSalud.especialidad;
  }

  handleEspecialidadClick(especialidad: Especialidad) {
    this.model.especialidad = especialidad;
    this.profesionales = especialidad.profesional;
  }

  handleProfesionalClick(profesional: Profesional) {
    this.model.profesional = profesional;
  }

  crear() {

    this.turnoService.saveTurno(this.model.centro, this.model.especialidad, this.model.profesional,
      this.model.fechaDesde, this.model.hora, this.model.observaciones)
      .then(data => {
        this.alertService.success('Registro Exitoso');
      })
      .catch((error) => {
        console.error(error);
        this.alertService.error('Error al guardar el turno');
      });

  }

  clearForm() {
    this.model = new Data();
    this.storeService.update('CentroSalud', null);
    this.storeService.update('turnos', []);
  }

}
