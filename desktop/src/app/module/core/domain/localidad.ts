import {Provincia} from './provincia';
export class Localidad {
  id?: number;
  nombre: string;
  provincia?: Provincia;

  constructor(mNombre = '') {
    this.nombre = mNombre;
    this.provincia = new Provincia();
  }
}
