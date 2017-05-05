import {Pais} from './pais';
export class Provincia {
  id?: number;
  nombre: string;
  pais?: Pais;

  constructor() {
    this.pais = new Pais();
  }
}
