import {Pais} from './pais';
import {User} from './user';
import {Provincia} from './provincia';
import {Localidad} from './localidad';
import {Persona} from './persona';
export class AppState {
  user: User;
  paises: Pais[];
  provincias: Provincia[];
  localidades: Localidad[];
  personas: Persona[];
  loginType: string;
}
