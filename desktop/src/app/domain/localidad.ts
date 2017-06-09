import {Provincia} from './provincia';
export class Localidad {
  id?: number;
  nombre: string;
  provincia?: Provincia;

  constructor() {
    this.id = 0;
    this.nombre = '';
  }
}
