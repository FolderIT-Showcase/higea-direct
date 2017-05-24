import {Plan} from './plan';
export class ObraSocial {
  id?: number;
  nombre: string;
  razon_social: string;
  codigo: string;
  planes?: Plan[] = [];


  constructor() {
  }
}
