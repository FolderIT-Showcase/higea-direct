import {centroSalud} from './centro-salud';
import {Especialidad} from './especialidad';
import {Profesional} from './profesional';
export class FiltroTurno {
  centroSalud: centroSalud;
  especialidad: Especialidad;
  profesional: Profesional;
  fecha: Date;
}
