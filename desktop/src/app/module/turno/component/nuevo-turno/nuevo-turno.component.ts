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
  fecha: Date = new Date();
}

@Component({
  selector: 'app-nuevo-turno',
  templateUrl: './nuevo-turno.component.html'
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
    this.model.fecha =  new Date(Date.now());
    this.model.persona = this.personas[0];
    this.storeService.update('persona', this.model.persona);
  }

  handlePersonaClick(persona: Persona) {
    this.model.persona = persona;
    this.storeService.update('persona', this.model.persona);
  }

  labelPersona() {
    if (!this.model.persona) {
      return;
    }
    return (this.model.persona.nombre + ' ' + this.model.persona.apellido).toUpperCase();

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
    this.turnoService.getTurnos(this.model.centro, this.model.especialidad, this.model.profesional, this.model.fecha)
      .catch((error) => {
        console.error(error);
      });
  }

  clearForm() {
    this.model = new Data();
    this.storeService.update('CentroSalud', null);
    this.storeService.update('turnos', []);
  }

}
