import {CentroSalud} from './centro-salud';
import {Especialidad} from './especialidad';
import {Profesional} from './profesional';
export class Turno {
  id: number;
  dia: number;
  fecha: number;
  hora: Date;
  observaciones = '';
  centroSalud: CentroSalud;
  especialidad: Especialidad;
  profesional: Profesional;
  enabled = true;
  tomado = false;
}
