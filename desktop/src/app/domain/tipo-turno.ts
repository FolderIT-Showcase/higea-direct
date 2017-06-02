import {MotivoTurno} from './motivo-turno';
export class TipoTurno {
  id?: number;
  codigo: number;
  descripcion: string;
  motivoTurno: MotivoTurno[] = [];

  constructor() {
  }
}
