import {Component} from '@angular/core';
import {CentroSalud} from '../../../core/domain/centro-salud';
import {Especialidad} from '../../../core/domain/especialidad';
import {Profesional} from '../../../core/domain/profesional';
import {Persona} from '../../../core/domain/persona';
import {StoreService} from '../../../core/service/store.service';

class Data {
  persona: string;
  centroSalud: CentroSalud;
  especialidad: Especialidad;
  profesional: Profesional;
  fechaDesde: Date = new Date();
}

@Component({
  selector: 'app-nuevo-turno',
  templateUrl: './nuevo-turno.component.html',
  styleUrls: ['./nuevo-turno.component.scss']
})
export class NuevoTurnoComponent {
  model: Data = new Data();
  centrosSalud: CentroSalud[] = [];
  especialidades: Especialidad[] = [];
  filteredEspecialidades: Especialidad[] = [];
  profesionales: Profesional[] = [];
  filteredProfesionales: Profesional[] = [];
  personas: Persona[] = [];

  constructor(private storeService: StoreService) {
    this.personas = this.storeService.get('integrantes');
    this.centrosSalud = this.storeService.get('centrosSalud');
  }

  handleCentroSaludClick(centroSalud: CentroSalud) {
    this.model.centroSalud = centroSalud;
  }

  handleEspecialidadClick(especialidad: Especialidad) {
    this.model.especialidad = especialidad;
  }

  handleProfesionalClick(profesional: Profesional) {
    this.model.profesional = profesional;
  }

  buscar() {

  }

  clearForm() {
    this.model = new Data();
  }

}
