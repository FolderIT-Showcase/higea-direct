import {Pais} from './pais';
export class Provincia {
  id?: number;
  nombre: string;
  pais?: Pais;
  codigo: number;

  constructor() {
    this.id = 0;
    this.nombre = '';
  }
}
