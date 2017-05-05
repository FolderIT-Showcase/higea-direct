import {Provincia} from './provincia';
export class Localidad {
  id?: number;
  nombre: string;
  provincia?: Provincia;

  constructor() {
    this.provincia = new Provincia();
  }
}
