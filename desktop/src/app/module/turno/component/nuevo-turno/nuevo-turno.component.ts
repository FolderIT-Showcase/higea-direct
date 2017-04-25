import {Component} from '@angular/core';
import {centroSalud} from '../../../core/domain/centro-salud';
import {Especialidad} from '../../../core/domain/especialidad';
import {Profesional} from '../../../core/domain/profesional';
import {Persona} from '../../../core/domain/persona';
import {StoreService} from '../../../core/service/store.service';
import {TurnoService} from '../../../core/service/turno.service';

class Data {
  persona: string;
  centroSalud: centroSalud;
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
  centrosSalud: centroSalud[] = [];
  especialidades: Especialidad[] = [];
  profesionales: Profesional[] = [];
  personas: Persona[] = [];

  constructor(private storeService: StoreService, private turnoService: TurnoService) {
    this.personas = this.storeService.get('integrantes');
    this.centrosSalud = this.storeService.get('centrosSalud');
    this.model.fechaDesde = new Date();
  }

  handleCentroSaludClick(centroSalud: centroSalud) {
    this.model.centroSalud = centroSalud;
    this.especialidades = centroSalud.especialidades;
  }

  handleEspecialidadClick(especialidad: Especialidad) {
    this.model.especialidad = especialidad;
    this.profesionales = especialidad.profesionales;
  }

  handleProfesionalClick(profesional: Profesional) {
    this.model.profesional = profesional;
  }

  buscar() {

    this.turnoService.getTurnos(this.model.centroSalud, this.model.especialidad, this.model.profesional, this.model.fechaDesde)
      .then()
      .catch((error) => {
        console.log(error);
      });

  }

  clearForm() {
    this.model = new Data();
    this.storeService.update('centroSalud', null);
    this.storeService.update('turnos', []);
  }

}
