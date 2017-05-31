import {CentroSalud} from './centro-salud';
import {Especialidad} from './especialidad';
import {Profesional} from './profesional';
import {TipoTurno} from './tipo-turno';
import {Plan} from './plan';
import {MotivoTurno} from './motivo-turno';
export class Turno {
  id: number;
  dia: number;
  fecha: number;
  hora: Date;
  observaciones = '';
  centroSalud: CentroSalud;
  especialidad: Especialidad;
  profesional: Profesional;
  motivoTurno: MotivoTurno;
  plan: Plan;
  enabled = true;
  tomado = false;
}
