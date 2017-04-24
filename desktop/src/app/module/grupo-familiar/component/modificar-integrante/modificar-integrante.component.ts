import {Component} from '@angular/core';
import {CentroSalud} from '../../../core/domain/centro-salud';
import {Especialidad} from '../../../core/domain/especialidad';
import {Profesional} from '../../../core/domain/profesional';
import {Persona} from '../../../core/domain/persona';

class Data {
  persona: string;
  centroSalud: string;
  especialidad: string;
  profesional: string;
  fechaDesde: Date = new Date();
}

@Component({
  selector: 'app-modificar-integrante',
  templateUrl: './modificar-integrante.component.html',
  styleUrls: ['./modificar-integrante.component.scss']
})
export class ModificarIntegranteComponent {
  model: Data = new Data();
  centrosSalud: CentroSalud[] = [];
  especialidades: Especialidad[] = [];
  filteredEspecialidades: Especialidad[] = [];
  profesionales: Profesional[] = [];
  filteredProfesionales: Profesional[] = [];
  personas: Persona[] = [];

  buscar() {

  }

}
