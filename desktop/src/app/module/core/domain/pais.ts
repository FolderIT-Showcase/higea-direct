import {Provincia} from './provincia';
export class Pais {
    id?: number;
    nombre: string;
    provincia?: Provincia;

    constructor() {
        this.nombre = '';
        this.provincia = new Provincia();
    }
}
