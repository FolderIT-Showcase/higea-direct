import {Component, OnInit} from '@angular/core';
import {CentroSalud} from '../../../core/domain/centro-salud';
import {Especialidad} from '../../../core/domain/especialidad';
import {Profesional} from '../../../core/domain/profesional';
import {Persona} from '../../../core/domain/persona';
import {StoreService} from '../../../core/service/store.service';
import {TurnoService} from '../../../core/service/turno.service';

class Data {
  persona: Persona;
  centro: CentroSalud;
  especialidad: Especialidad;
  profesional: Profesional;
  fechaDesde: Date = new Date();
}

@Component({
  selector: 'app-nuevo-turno',
  templateUrl: './nuevo-turno.component.html',
  styleUrls: ['./nuevo-turno.component.scss']
})
export class NuevoTurnoComponent implements OnInit {

  model: Data = new Data();
  centrosSalud: CentroSalud[] = [];
  especialidades: Especialidad[] = [];
  profesionales: Profesional[] = [];
  personas: Persona[] = [];

  constructor(private storeService: StoreService, private turnoService: TurnoService) {
  }

  ngOnInit(): void {
    const personaUser = this.storeService.get('integrantes');
    this.personas = this.storeService.get('integrantes');
    this.centrosSalud = this.storeService.get('centrosSalud');
    this.model.fechaDesde = new Date();
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

  buscar() {

    this.turnoService.getTurnos(this.model.centro, this.model.especialidad, this.model.profesional, this.model.fechaDesde)
      .then()
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
