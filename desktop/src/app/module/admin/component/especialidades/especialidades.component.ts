import {Component, OnInit} from '@angular/core';
import {Especialidad} from '../../../../domain/especialidad';
import {StoreService} from '../../../../service/store.service';
import {Profesional} from '../../../../domain/profesional';
import {AlertService} from '../../../../service/alert.service';
import {AdminService} from '../../../../service/admin.service';
import {ModalDirective} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PagerService} from '../../../../service/pager.service';
import {Subscription} from 'rxjs/Subscription';
import {Store} from '../../../../service/store';

class Data {
  especialidadLabel: string;
  especialidad: Especialidad;
  profesional: Profesional;
}

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html'
})
export class EspecialidadesComponent implements OnInit {

  especialidades: Especialidad[] = [];
  especialidad: Especialidad = new Especialidad();
  model: Data = new Data();
  profesionales: Profesional[] = [];
  especialidadName: string;

  deleteModal: ModalDirective;
  updateModal: ModalDirective;
  saveModal: ModalDirective;
  form: FormGroup;

  public totalItems = 0;
  public currentPage = 1;
  public smallnumPages = 0;
  public maxSize = 10;
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  subs: Subscription[] = [];

  constructor(private storeService: StoreService,
              private fb: FormBuilder,
              private store: Store,
              private  pagerService: PagerService,
              private alertService: AlertService,
              private adminService: AdminService) {
    this.form = fb.group({
      'especialidadLabel': [null, Validators.required]
    });
  }

  ngOnInit() {

    this.subs.push(
      this.store.changes.pluck('especialidades').subscribe(
        (data: any) => {
          this.especialidades = data;
          // this.pagedItems = this.especialidades.slice(this.pager.startIndex, this.pager.endIndex + 1);
          this.setPage(this.pager.currentPage);
        }
      ));

    // initialize to page 1
    this.setPage(1);
  }

  public setPage(page: number): void {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.especialidades.length, page);

    // get current page of items
    this.pagedItems = this.especialidades.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.currentPage = page;
    this.totalItems = this.pager.totalPages * this.maxSize;
  }

  public pageChanged(event: any): void {
    this.setPage(event.page);
  }

  submitSaveForm() {
    this.save();
  }

  save() {
    this.profesionales = this.storeService.get('profesionalesSeleccionados');
    if (!this.profesionales || this.profesionales.length === 0) {
      this.alertService.error('Debe seleccionar los profesionales asociados a la especialidad');
      return;
    }
    this.especialidad.nombre = this.model.especialidadLabel.toUpperCase();
    this.especialidad.profesional = this.profesionales;
    this.adminService.saveEspecialidad(this.especialidad)
      .then(data => {
        this.alertService.success('Se guardo exitosamente');
      });
    this.saveModal.hide();
    this.clean();

  }

  showSaveModal() {
    this.clean();
    this.especialidad = new Especialidad();
    this.saveModal.show();
    this.storeService.update('especialidad', this.especialidad);
  }

  showUpdateModal(especialidad: Especialidad) {
    this.especialidad = especialidad;
    this.model.especialidadLabel = especialidad.nombre;
    this.storeService.update('especialidad', especialidad);
    this.updateModal.show();
  }

  showDeleteModal(especialidad: Especialidad) {
    this.especialidad = especialidad;
    this.deleteModal.show();
  }

  handleSaveModal(event) {
    this.saveModal = event;
  }

  handleUpdateModal(event) {
    this.updateModal = event;
  }

  handleDeleteModal(event) {
    this.deleteModal = event;
  }

  public deleteEspecialidad() {
    const especialidades = this.storeService.get('especialidades');
    for (const x of especialidades) {
      if (x.id === this.especialidad.id) {
        this.delete(x);
        this.storeService.findAndDelete('especialidades', x.id);
        break;
      }
    }
    this.deleteModal.hide();
  }

  delete(especialidad: Especialidad) {
    this.adminService.deleteEspecialidad(especialidad).then(data => {
      this.alertService.success('Se borro exitosamente');
    });
  }

  submitUpdateForm() {
    this.especialidad.nombre = this.model.especialidadLabel.toUpperCase();
    const profesionales = this.storeService.get('profesionalesSeleccionados');
    if (!profesionales || profesionales.length === 0) {
      this.alertService.error('Debe seleccionar los profesionales asociados a la especialidad');
      return;
    }
    this.update(this.especialidad);

  }

  update(especialidad: Especialidad) {

    this.adminService.updateEspecialidad(especialidad)
      .then(data => {
        this.alertService.success('Se actualizo exitosamente');
      });
    this.updateModal.hide();
    this.clean();
  }

  clean() {
    this.form = this.fb.group({
      'especialidadLabel': [null, Validators.required]
    });
    this.especialidad = new Especialidad();
    this.model = new Data();
  }

}
