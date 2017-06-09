import {ObraSocial} from './obra-social';
export class Plan {
  id?: number;
  codigo: number;
  razon_social: string;
  obraSocial?: ObraSocial;

  constructor() {
  }
}
