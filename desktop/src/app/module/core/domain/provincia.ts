import {Pais} from './pais';
export class Provincia {
  id?: number;
  nombre: string;
  pais?: Pais;

  constructor(mNombre = '') {
    this.pais = new Pais();
    this.nombre = mNombre;
  }
}
