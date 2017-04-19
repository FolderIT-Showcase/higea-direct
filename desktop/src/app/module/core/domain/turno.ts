import {CentroSalud} from './centro-salud';
export class Turno {
  id: number;
  dia: string;
  fecha: string;
  hora: string;
  observaciones: string;
  centroSalud: CentroSalud;
}
