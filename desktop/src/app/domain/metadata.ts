import {Pais} from './pais';
import {Provincia} from './provincia';
import {Localidad} from './localidad';
import {ObraSocial} from './obra-social';
import {Profesional} from './profesional';
import {Especialidad} from './especialidad';
import {TipoTurno} from './tipo-turno';
import {EstadosCiviles} from './enums/estado-civil';
import {MotivoTurno} from './motivo-turno';
export class Metadata {
  paises: Pais[];
  provincias: Provincia[];
  localidades: Localidad[];
  obrasSociales: ObraSocial[];
  especialidades: Especialidad[] = [];
  profesionales: Profesional[] = [];
  tipoTurnos: TipoTurno[] = [];
  estadosCiviles: EstadosCiviles[] = [];
  motivos: MotivoTurno[] = [];
}
