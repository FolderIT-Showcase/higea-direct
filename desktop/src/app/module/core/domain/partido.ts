import {Localidad} from './localidad';
export class Partido {
    id?: number;
    nombre: string;
    localidad?: Localidad;

    constructor() {
        this.localidad = new Localidad();
    }
}
