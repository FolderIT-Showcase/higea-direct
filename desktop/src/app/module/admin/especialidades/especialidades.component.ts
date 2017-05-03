import {Component, OnInit} from '@angular/core';
import {Especialidad} from '../../core/domain/especialidad';
import {StoreService} from '../../core/service/store.service';
import {Profesional} from '../../core/domain/profesional';
import {TurnoService} from '../../core/service/turno.service';
import {AlertService} from '../../core/service/alert.service';
import {AdminService} from '../../core/service/admin.service';

class Data {
  especialidad: Especialidad;
  profesional: Profesional;
  especialidadName: string;
}

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.scss']
})
export class EspecialidadesComponent implements OnInit {

  especialidades: Especialidad[] = [];
  model: Data = new Data();
  // especialidades: Especialidad;
  profesionales: Profesional[] = [];
  especialidadName: string;

  constructor(private storeService: StoreService,
              private turnoService: TurnoService,
              private alertService: AlertService,
              private adminService: AdminService) {
  }

  ngOnInit() {
    this.especialidades = this.storeService.get('especialidades');
  }

  crear(): void {
    this.profesionales = this.storeService.get('profesionalesSeleccionados');
    console.log('Especialidad nombre: ' + this.model.especialidadName);
    const especialidad = new Especialidad();
    especialidad.nombre = this.model.especialidadName.toUpperCase();
    especialidad.profesional = this.profesionales;
    console.log('Especialidad: ' + JSON.stringify(especialidad));
    this.adminService.saveEspecialidad(especialidad).then(data => {
      this.alertService.success('Se guardo exitosamente');
    })
      .catch((error) => {
        console.log(error);
        this.alertService.success('Error');
      });
    ;
  }

}
