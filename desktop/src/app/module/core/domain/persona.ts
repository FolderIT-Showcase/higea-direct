import {User} from './user';
import {Documento} from './documento';
import {EstadoCivil} from './enums/estado-civil';
import {Domicilio} from './domicilio';
export class Persona {
  id: number;
  apellido: string;
  fechaNacimiento: Date;
  genero: string;
  nombre: string;
  userAsociado: User;
  documento: Documento;
  estadoCivil: EstadoCivil;
  domicilio: Domicilio;
}
