import {Partido} from './partido';
export class Provincia {
    id?: number;
    nombre: string;
    partido?: Partido;

    constructor() {
        this.partido = new Partido();
    }
}
