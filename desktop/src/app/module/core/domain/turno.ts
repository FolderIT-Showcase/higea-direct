import {CentroSalud} from './centro-salud';
import {Especialidad} from './especialidad';
import {Profesional} from './profesional';
export class Turno {
  id: number;
  dia: Date;
  fecha: Date;
  hora: Date;
  observaciones = '';
  centroSalud: CentroSalud;
  especialidad: Especialidad;
  profesional: Profesional;
  enabled:boolean;
}
