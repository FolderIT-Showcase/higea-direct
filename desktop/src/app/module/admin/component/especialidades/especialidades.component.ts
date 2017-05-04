import {Component, OnInit} from '@angular/core';
import {Especialidad} from '../../../core/domain/especialidad';
import {StoreService} from '../../../core/service/store.service';
import {Profesional} from '../../../core/domain/profesional';
import {AlertService} from '../../../core/service/alert.service';
import {AdminService} from '../../../core/service/admin.service';
import {ModalDirective} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PagerService} from '../../../core/service/pager.service';
import {Subscription} from 'rxjs';
import {Store} from '../../../core/service/store';

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
          this.pagedItems = this.especialidades.slice(this.pager.startIndex, this.pager.endIndex + 1);
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
    this.profesionales = this.storeService.get('profesionalesSeleccionados');

    const especialidad = new Especialidad();
    especialidad.nombre = this.model.especialidadLabel.toUpperCase();
    especialidad.profesional = this.profesionales;

    this.adminService.saveEspecialidad(especialidad).then(data => {
      this.alertService.success('Se guardo exitosamente');
    })
      .catch((error) => {
        console.log(error);
        this.alertService.error('Error al guardar la especialidad');
      });
  }

  showSaveModal(especialidad: Especialidad) {
    this.saveModal.show();
    this.especialidad = especialidad;
  }

  showUpdateModal(especialidad: Especialidad) {
    this.especialidad = especialidad;
    this.updateModal.show();
    this.model.especialidadLabel = especialidad.nombre;
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
    const especialidades: Especialidad[] = this.storeService.get('especialidades');
    for (const x of especialidades) {
      if (x.id === this.especialidad.id) {
        this.storeService.findAndDelete('especialidades', x.id);
        break;
      }
    }
    this.deleteModal.hide();
  }


}
