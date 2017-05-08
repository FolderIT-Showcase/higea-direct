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
import {forEach} from "@angular/router/src/utils/collection";

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
      this.saveModal.hide();
    })
      .catch((error) => {
        console.log(error);
        this.alertService.error('Error al guardar la especialidad');
        this.saveModal.hide();
      });
    this.clean();
  }

  showSaveModal(especialidad: Especialidad) {
    this.clean();
    this.saveModal.show();
    this.especialidad = especialidad;
  }

  showUpdateModal(especialidad: Especialidad) {
    this.especialidad = especialidad;
    this.updateModal.show();
    this.model.especialidadLabel = especialidad.nombre;

  }

  /*pintarSeleccionados(especialidad: Especialidad){
    this.profesionales = this.storeService.get('profesionalesSeleccionados');
    for(var i = 1; i <= especialidad.profesional.length; i++){
      let item = especialidad.profesional[i];
      if(item.id===especialidad.profesional.)
    }

  }*/


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
    })
      .catch((error) => {
        console.log("Error"+ error);
        this.alertService.error(error.body);
      });
  }

  submitUpdateForm(value: Data) {
    console.log(value);
    if (value.especialidad) {
      this.especialidad.nombre = value.especialidadLabel;
    }

    this.update(this.especialidad);

  }

  update(especialidad: Especialidad) {
    this.adminService.updateEspecialidad(especialidad).then(data => {
      this.alertService.success('Se guardo exitosamente');
      this.updateModal.hide();
    })
      .catch((error) => {
        console.log(error);
        this.updateModal.hide();
        this.alertService.error('Error al querer guardar el Profesional');
      });

    this.clean();
  }

  clean(){
    this.form.reset();
  }



}
