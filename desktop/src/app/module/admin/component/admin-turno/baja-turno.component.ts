import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AlertService} from '../../../core/service/alert.service';
import {Persona} from '../../../core/domain/persona';
import {CentroSalud} from '../../../core/domain/centro-salud';
import {Especialidad} from '../../../core/domain/especialidad';
import {Profesional} from '../../../core/domain/profesional';
import {StoreService} from '../../../core/service/store.service';
import {TurnoService} from '../../../core/service/turno.service';

class Data {
  persona: Persona;
  centro: CentroSalud;
  especialidad: Especialidad;
  profesional: Profesional;
  fecha: Date = new Date();
}

@Component({
  selector: 'app-baja-turno',
  templateUrl: './baja-turno.component.html'
})

export class BajaTurnoComponent implements OnInit {

  model: Data = new Data();
  centrosSalud: CentroSalud[] = [];
  especialidades: Especialidad[] = [];
  profesionales: Profesional[] = [];
  personas: Persona[] = [];

  constructor(private router: Router,
              private alertService: AlertService,
              private storeService: StoreService, private turnoService: TurnoService) {
  }

  ngOnInit(): void {
    const personaUser = this.storeService.get('integrantes');
    this.personas = this.storeService.get('integrantes');
    this.centrosSalud = this.storeService.get('centrosSalud');
    this.model.fecha = new Date();
  }

  handlePersonaClick(persona: Persona) {
    this.model.persona = persona;
    this.storeService.update('persona', persona);
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

  buscar() {
    console.log('Entro a buscar');
    this.turnoService.getTurnos(this.model.centro, this.model.especialidad, this.model.profesional, this.model.fecha)
      .catch((error) => {
        console.log(error);
      });
  }

  clearForm() {
    this.model = new Data();
    this.storeService.update('CentroSalud', null);
    this.storeService.update('turnos', []);
  }
}
