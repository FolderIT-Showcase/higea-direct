import {Component, OnInit} from '@angular/core';
import {StoreService} from "../../../core/service/store.service";
import {TurnoService} from "../../../core/service/turno.service";
import {AlertService} from "../../../core/service/alert.service";
import {Profesional} from "../../../core/domain/profesional";
import {Especialidad} from "../../../core/domain/especialidad";
import {AdminService} from "../../../core/service/admin.service";
import {CentroSalud} from "../../../core/domain/centro-salud";

class Data {


  especialidad: Especialidad;
  profesional: Profesional;
  centroSaludName:string;

}

@Component({
  selector: 'app-alta-centro-salud',
  templateUrl: './alta-centro-salud.component.html',
  styleUrls: ['./alta-centro-salud.component.scss']
})
export class AltaCentroSaludComponent implements OnInit {

  model:Data = new Data();
  especialidades:Especialidad[]= [];
  profesionales:Profesional[] = [];
  centroSaludName:string;

  constructor(private storeService:StoreService, private turnoService:TurnoService, private alertService:AlertService, private adminService:AdminService) {
  }

  ngOnInit():void {

    // this.profesionales = this.storeService.get('profesionales');

  }

  crear():void{
    this.especialidades  = this.storeService.get('especialidadesSeleccionadas');
    console.log("Especialidad nombre: "+this.model.centroSaludName);
    let centroSalud = new CentroSalud();
    centroSalud.nombre = this.model.centroSaludName.toUpperCase();
    centroSalud.especialidad = this.especialidades;

    this.adminService.saveCentroSalud(centroSalud).then(data => {
        //this.clearForm();
        this.alertService.success('Se guardo exitosamente');
        this.clean();
      })
      .catch((error) => {
        console.log(error);
        this.alertService.error('Error al querer guardar el Centro de Salud');
      });;
  }

  clean(){
    this.model.centroSaludName = "";
    this.especialidades = [];
  }
}
