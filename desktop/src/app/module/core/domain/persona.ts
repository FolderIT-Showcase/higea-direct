import {User} from './user';
import {Documento} from './documento';
import {Domicilio} from './domicilio';
import {Turno} from './turno';
import {Contacto} from './contacto';
export class Persona {
    id?: number;
    apellido?: string;
    fechaNacimiento?: Date;
    genero?: string;
    nombre?: string;
    userAsociado?: User;
    integrantes?: Persona[];
    documento?: Documento;
    estadoCivil?: string;
    domicilio?: Domicilio;
    contacto?: Contacto[];
    turno?: Turno[];

    constructor() {
        this.documento = {
            'tipo': undefined,
            'numero': undefined
        };
        this.domicilio = {
            'localidad': {
                'nombre': undefined,
                'provincia': {
                    'nombre': undefined,
                    'pais': {
                        'nombre': undefined
                    }
                }
            }
        };
        this.contacto = [{
            'tipoContacto': 'telefono',
            'dato': undefined
        }];
    }
}
