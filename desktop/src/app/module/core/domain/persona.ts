import {User} from './user';
import {Documento} from './documento';
import {EstadoCivil} from './enums/estado-civil';
import {Domicilio} from './domicilio';
import {Turno} from './turno';
export class Persona {
  id: number;
  apellido: string;
  fechaNacimiento: Date;
  genero: string;
  nombre: string;
  userAsociado: User;
  integrantes: Persona[];
  documento: Documento;
  estadoCivil: EstadoCivil;
  domicilio: Domicilio;
  turno: Turno[];
}
