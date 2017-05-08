import {Component, OnInit} from '@angular/core';
import {Persona} from '../../../core/domain/persona';
import {CentroSalud} from '../../../core/domain/centro-salud';
import {Especialidad} from '../../../core/domain/especialidad';
import {Profesional} from '../../../core/domain/profesional';
import {Turno} from '../../../core/domain/turno';
import {StoreService} from '../../../core/service/store.service';
import {TurnoService} from '../../../core/service/turno.service';
import {AlertService} from '../../../core/service/alert.service';
import {ModalDirective} from "ngx-bootstrap/index";
import {AdminService} from "../../../core/service/admin.service";
import {Subscription} from "rxjs/Subscription";
import {PagerService} from "../../../core/service/pager.service";
import {Store} from "../../../core/service/store";


class Data {
  persona: Persona;
  centro: CentroSalud;
  especialidad: Especialidad;
  profesional: Profesional;
  fechaDesde: Date = new Date();
  hora: Date = new Date();
  observaciones: string;
}

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.scss']
})
export class TurnosComponent implements OnInit {

  turnos: Turno[] = [];
  model: Data = new Data();
  observaciones: string;
  centrosSalud: CentroSalud[] = [];
  especialidades: Especialidad[] = [];
  profesionales: Profesional[] = [];
  personas: Persona[] = [];
  turno:Turno;

  deleteModal: ModalDirective;

  totalItems = 0;
  currentPage = 1;
  smallnumPages = 0;
  maxSize = 10;
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  subs: Subscription[] = [];

  constructor(private storeService: StoreService, private turnoService: TurnoService, private alertService: AlertService, private adminService: AdminService,private store: Store,
              private  pagerService: PagerService) {
  }

  ngOnInit() {
    this.centrosSalud = this.storeService.get('centrosSalud');
    this.turnos =  this.storeService.get('turnos');
    this.model.fechaDesde = new Date();
    this.model.hora = new Date();

    this.subs.push(
      this.store.changes.pluck('turnos').subscribe(
        (data: any) => {
          this.turnos = data;
          console.log("Data "+data);
          this.pagedItems = this.turnos.slice(this.pager.startIndex, this.pager.endIndex + 1);
        }
      ));

    // initialize to page 1
    this.setPage(1);
  }

  handlePersonaClick(persona: Persona) {
    this.model.persona = persona;
  }

  handleCentroSaludClick(centroSalud: CentroSalud) {
    this.model.centro = centroSalud;
    this.especialidades = centroSalud.especialidad;
  }

  handleEspecialidadClick(especialidad: Especialidad) {
    this.model.especialidad = especialidad;
    this.profesionales = especialidad.profesional;
  }

  handleProfesionalClick(profesional: Profesional) {
    this.model.profesional = profesional;
  }

  crear() {

    this.turnoService.saveTurno(this.model.centro, this.model.especialidad, this.model.profesional,
      this.model.fechaDesde, this.model.hora, this.model.observaciones)
      .then(data => {
        this.alertService.success('Registro Exitoso');
      })
      .catch((error) => {
        console.error(error);
        this.alertService.error('Error al guardar el turno');
      });

  }

  clearForm() {
    this.model = new Data();
    this.storeService.update('CentroSalud', null);
    this.storeService.update('turnos', []);
  }

  showDeleteModal(turno: Turno) {
    this.deleteModal.show();
    this.turno = turno;
  }

  handleDeleteModal(event) {
    this.deleteModal = event;
  }

  public deleteTurno() {
    const turnos = this.storeService.get('turnos');
    for (const x of turnos) {
      if (x.id === this.turno.id) {
        this.delete(x);
        this.storeService.findAndDelete('turnos', x.id);
        break;
      }
    }
    this.deleteModal.hide();
  }

  delete(turno: Turno) {
    this.adminService.deleteTurno(turno).then(data => {
        this.alertService.success('Se borro exitosamente');
      })
      .catch((error) => {
        console.log("Error"+ error);
        this.alertService.error(error.body);
      });
  }

  public setPage(page: number): void {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.turnos.length, page);

    // get current page of items
    this.pagedItems = this.turnos.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.currentPage = page;
    console.log('paginas' + this.pager.totalPages);
    this.totalItems = this.pager.totalPages * this.maxSize;
  }

}
