import {Injectable} from '@angular/core';
import {ApiService} from './api.service';

@Injectable()
export class TurnoService {

  constructor(private api: ApiService) {
  }

  getCentrosDeSalud() {
    const path = ''; // TODO: a ser definido
    return this.api.get(path).first().toPromise();
  }

  getEspecialidades() {
    const path = ''; // TODO: a ser definido
    return this.api.get(path).first().toPromise();
  }

  getProfesionales() {
    const path = ''; // TODO: a ser definido
    return this.api.get(path).first().toPromise();
  }

}
