import {Preparacion} from './preparacion';
export class MotivoTurno {

  id?: number;
  codigo: number;
  descripcion: string;
  preparacion: Preparacion;
  coseguro: number;

  constructor() {
  }
}
