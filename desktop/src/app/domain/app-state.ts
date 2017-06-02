import {Persona} from './persona';
import {CentroSalud} from './centro-salud';
import {Turno} from './turno';
import {Provincia} from './provincia';
import {Localidad} from './localidad';
import {Pais} from './pais';
export class AppState {
  integrantes: Persona[] = [];
  persona: Persona = null;
  centroSalud: CentroSalud = null;
  centrosSalud: CentroSalud[] = [];
  turnos: Turno[] = [];
  paises: Pais[] = [];
  provincias: Provincia[] = [];
  localidades: Localidad[] = [];
}