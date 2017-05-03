import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {StoreService} from "./store.service";
import {Especialidad} from "../domain/especialidad";
import {AlertService} from "./alert.service";
import {CentroSalud} from "../domain/centro-salud";

@Injectable()
export class AdminService {

  constructor(private api: ApiService,
              private storeService: StoreService,private alertService:AlertService) {
  }

  getProfesionales() {
    const path = 'profesional';
    return this.api.get(path)
      .do(data => {
        this.storeService.update('profesionales', data);
      })
      .first().toPromise();
  }

  saveEspecialidad(especialidad:Especialidad){
    const path = 'especialidad';
    return this.api.put(path,especialidad)
      .do(data => {
        //this.storeService.update('profesionales', data);
      })
      .first().toPromise();
  }

  getEspecialidades() {
    const path = 'especialidad';
    return this.api.get(path)
      .do(data => {
        this.storeService.update('especialidades', data);
      })
      .first().toPromise();
  }

  saveCentroSalud(centroSalud:CentroSalud){
    const path = 'centroSalud';
    return this.api.put(path,centroSalud)
      .do(data => {
        //this.storeService.update('profesionales', data);
      })
      .first().toPromise();
  }

}
