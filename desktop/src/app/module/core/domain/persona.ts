import {User} from './user';
import {Documento} from './documento';
import {Domicilio} from './domicilio';
import {Turno} from './turno';
import {Contacto} from './contacto';
import {Plan} from './plan';

export class Persona {
  id?: number;
  apellido?: string;
  fechaNacimiento?: number;
  genero?: string;
  nombre?: string;
  userAsociado?: User;
  integrantes?: Persona[] = [];
  documento?: Documento;
  estadoCivil?: string;
  domicilio?: Domicilio;
  contacto?: Contacto[] = [];
  turno?: Turno[] = [];
  plan?: Plan;
}
