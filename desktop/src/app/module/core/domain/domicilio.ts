import {Localidad} from './localidad';
export class Domicilio {
  id?: number;
  localidad?: Localidad;
  calle?: string;
  piso?: number;
  departamento?: string;
}
