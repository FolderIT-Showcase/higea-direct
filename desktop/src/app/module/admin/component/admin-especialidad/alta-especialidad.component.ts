import {Component, OnInit} from '@angular/core';
import {StoreService} from "../../../core/service/store.service";
import {TurnoService} from "../../../core/service/turno.service";
import {AlertService} from "../../../core/service/alert.service";
import {Profesional} from "../../../core/domain/profesional";
import {Especialidad} from "../../../core/domain/especialidad";
import {AdminService} from "../../../core/service/admin.service";

class Data {


  especialidad: Especialidad;
  profesional: Profesional;
  especialidadName:string;

}

@Component({
  selector: 'app-alta-especialidad',
  templateUrl: './alta-especialidad.component.html',
  styleUrls: ['./alta-especialidad.component.scss']
})
export class AltaEspecialidadComponent implements OnInit {

  model: Data = new Data();
  especialidades: Especialidad;
  profesionales: Profesional[] = [];
  especialidadName: string;

  constructor(private storeService: StoreService, private turnoService: TurnoService,  private alertService: AlertService,private adminService:AdminService) {
  }

  ngOnInit():void {

   // this.profesionales = this.storeService.get('profesionales');

  }

  crear():void{
    this.profesionales  = this.storeService.get('profesionalesSeleccionados');
    console.log("Especialidad nombre: "+this.model.especialidadName);
    let especialidad = new Especialidad();
    especialidad.nombre = this.model.especialidadName;
    especialidad.profesional = this.profesionales;
    console.log("Especialidad: "+JSON.stringify(especialidad));
    this.adminService.saveProfesionales(especialidad).then(data => {
        //this.clearForm();
        this.alertService.success('Se guardo exitosamente');
      })
      .catch((error) => {
        console.log(error);
        this.alertService.success('Error');
      });;
  }
}
