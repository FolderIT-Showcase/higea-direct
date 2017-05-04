import {Component, OnInit} from '@angular/core';
import {CentroSalud} from '../../../core/domain/centro-salud';
import {StoreService} from '../../../core/service/store.service';
import {Profesional} from '../../../core/domain/profesional';
import {Especialidad} from '../../../core/domain/especialidad';
import {TurnoService} from '../../../core/service/turno.service';
import {AlertService} from '../../../core/service/alert.service';
import {AdminService} from '../../../core/service/admin.service';

class Data {
  especialidad: Especialidad;
  profesional: Profesional;
  centroSaludName: string;
}

@Component({
  selector: 'app-centros-salud',
  templateUrl: './centros-salud.component.html',
  styleUrls: ['./centros-salud.component.scss']
})
export class CentrosSaludComponent implements OnInit {

  centros: CentroSalud[] = [];
  model: Data = new Data();
  especialidades: Especialidad[] = [];
  profesionales: Profesional[] = [];
  centroSaludName: string;

  constructor(private storeService: StoreService,
              private turnoService: TurnoService,
              private alertService: AlertService,
              private adminService: AdminService) {
  }

  ngOnInit() {
    this.centros = this.storeService.get('centrosSalud');
  }

  crear(): void {
    this.especialidades = this.storeService.get('especialidadesSeleccionadas');
    console.log('Especialidad nombre: ' + this.model.centroSaludName);
    const centroSalud = new CentroSalud();
    centroSalud.nombre = this.model.centroSaludName.toUpperCase();
    centroSalud.especialidad = this.especialidades;

    this.adminService.saveCentroSalud(centroSalud).then(data => {
      this.alertService.success('Se guardo exitosamente');
      this.clean();
    })
      .catch((error) => {
        console.log(error);
        this.alertService.success('Error');
      });
    ;
  }

  clean() {
    this.model.centroSaludName = '';
    this.especialidades = [];
  }

}
