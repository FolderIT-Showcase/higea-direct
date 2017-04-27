import {User} from './user';
import {Documento} from './documento';
import {Domicilio} from './domicilio';
import {Turno} from './turno';
export class Persona {
    id?: number;
    principal?: boolean;
    apellido?: string;
    fechaNacimiento?: Date;
    genero?: string;
    nombre?: string;
    userAsociado?: User;
    integrantes?: Persona[];
    documento?: Documento;
    estadoCivil?: string;
    domicilio?: Domicilio;
    telefono?: string;
    nacionalidad?: string;
    turno?: Turno[];

    constructor() {
        this.principal = false;
        this.documento = {
            'tipo': undefined,
            'numero': undefined
        };
        this.domicilio = {
            'pais': {
                'nombre': undefined,
                'provincia': {
                    'nombre': undefined,
                    'partido': {
                        'nombre': undefined,
                        'localidad': {
                            'nombre': undefined
                        }
                    }
                }
            }
        };
    }
}
