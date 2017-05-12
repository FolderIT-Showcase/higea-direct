import {Component, OnDestroy, OnInit} from '@angular/core';
import {Persona} from '../../../core/domain/persona';
import {CentroSalud} from '../../../core/domain/centro-salud';
import {Especialidad} from '../../../core/domain/especialidad';
import {Profesional} from '../../../core/domain/profesional';
import {Turno} from '../../../core/domain/turno';
import {StoreService} from '../../../core/service/store.service';
import {AlertService} from '../../../core/service/alert.service';
import {ModalDirective} from 'ngx-bootstrap';
import {AdminService} from '../../../core/service/admin.service';
import {Subscription} from 'rxjs/Subscription';
import {PagerService} from '../../../core/service/pager.service';
import {Store} from '../../../core/service/store';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IMyOptions} from 'mydatepicker';

class Data {

  centro: CentroSalud;
  especialidad: Especialidad;
  profesional: Profesional;
  hora: Date = new Date();
  observaciones: string;
}

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html'
})
export class TurnosComponent implements OnInit, OnDestroy {

  turnos: Turno[] = [];
  model: Data = new Data();
  observaciones: string;
  centrosSalud: CentroSalud[] = [];
  especialidades: Especialidad[] = [];
  profesionales: Profesional[] = [];
  personas: Persona[] = [];
  turno: Turno;

  deleteModal: ModalDirective;
  saveModal: ModalDirective;
  public selectUndefined: any;

  totalItems = 0;
  currentPage = 1;
  smallnumPages = 0;
  maxSize = 10;
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  subs: Subscription[] = [];
  form: FormGroup;

  myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd/mm/yyyy',
  };

  constructor(private storeService: StoreService,
              private alertService: AlertService,
              private adminService: AdminService,
              private store: Store,
              private pagerService: PagerService,
              private fb: FormBuilder) {

    this.form = fb.group({
      'centro': [null, Validators.required],
      'especialidad': [null, Validators.required],
      'profesional': [null, Validators.required],
      'fechaDesde': [null],
      'hora': [null],
      'observaciones': [null, Validators.required]
    });
  }

  ngOnInit() {
    this.centrosSalud = this.storeService.get('centrosSalud');
    this.turnos = this.storeService.get('turnos');
    this.model.hora = new Date();

    this.subs.push(
      this.store.changes.pluck('turnos').subscribe(
        (data: any) => {
          this.turnos = data;
          this.setPage(this.pager.currentPage);
        }
      ));

    // initialize to page 1
    this.setPage(1);
  }

  ngOnDestroy() {
    this.storeService.update('turnos', []);
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
    });

    this.setPage(this.pager.currentPage);
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
    this.totalItems = this.pager.totalPages * this.maxSize;
  }

  handleSaveModal(event) {
    this.saveModal = event;
  }

  submitSaveForm(value) {
    this.save(value);
  }

  save(value) {

    value.hora = this.model.hora;
    value.fechaDesde = value.fechaDesde.epoc * 1000;

    console.log(value)

    const ahora: any = Date.now();
    const fechaTurno = value.fechaDesde;

    console.log(ahora)
    console.log(fechaTurno)

    if (!( Number(fechaTurno) >= Number(ahora))) {

      this.alertService.error('No puede crear un turno con fecha invalida, verifique');
      return;
    }

    this.adminService.saveTurno(this.model.centro, this.model.especialidad, this.model.profesional,
      value.fechaDesde, value.hora, value.observaciones)
      .then(data => {
        this.alertService.success('Registro Exitoso');
        this.setPage(this.pager.currentPage);
      })
      .catch((error) => {
        this.setPage(this.pager.currentPage);
      });

    this.saveModal.hide();
    this.clean();
  }

  clean() {
    this.form.reset();
  }

}
