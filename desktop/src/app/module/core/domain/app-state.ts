import {Pais} from './pais';
import {User} from './user';
import {Provincia} from './provincia';
import {Localidad} from './localidad';
import {Persona} from './persona';
import {CentroSalud} from './centro-salud';
import {Turno} from './turno';
export class AppState {
  user: User;
  paises: Pais[];
  provincias: Provincia[];
  localidades: Localidad[];
  personas: Persona[];
  persona: Persona;
  loginType: string;
  centroSalud: CentroSalud;
  centrosSalud: CentroSalud[];
  turnos: Turno[];
}
