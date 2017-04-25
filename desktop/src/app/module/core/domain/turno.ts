import {centroSalud} from './centro-salud';
import {Especialidad} from './especialidad';
import {Profesional} from './profesional';
export class Turno {
  id: number;
  dia: string;
  fecha: string;
  hora: string;
  observaciones = '';
  centroSalud: centroSalud;
  especialidad: Especialidad;
  profesional: Profesional;
}
