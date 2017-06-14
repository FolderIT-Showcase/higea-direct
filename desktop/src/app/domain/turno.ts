import {CentroSalud} from './centro-salud';
import {Especialidad} from './especialidad';
import {Profesional} from './profesional';
import {Plan} from './plan';
import {MotivoTurno} from './motivo-turno';
export class Turno {
  id: number;
  dia: number;
  fecha: number;
  hora: any;
  observaciones = '';
  centroSalud: CentroSalud;
  especialidad: Especialidad;
  profesional: Profesional;
  motivoTurno: MotivoTurno;
  plan: Plan;
  enabled = false;
  tomado = false;
  duracion: number;
}
