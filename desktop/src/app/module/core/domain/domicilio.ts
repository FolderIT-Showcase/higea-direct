import {Pais} from './pais';
export class Domicilio {
  id?: number;
  pais?: Pais;
  calle?: string;
  altura?: number;
  departamento?: string;

  constructor() {
    this.pais = new Pais();
  }
}
