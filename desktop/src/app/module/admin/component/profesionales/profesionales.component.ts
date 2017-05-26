import {Component, OnInit, ViewChild} from '@angular/core';
import {Profesional} from '../../../core/domain/profesional';
import {StoreService} from '../../../core/service/store.service';
import {AlertService} from '../../../core/service/alert.service';
import {AdminService} from '../../../core/service/admin.service';
import {Store} from '../../../core/service/store';
import {PagerService} from '../../../core/service/pager.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {ModalDirective} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Especialidad} from '../../../core/domain/especialidad';

class Data {
  nombre: string;
  apellido: string;
}
@Component({
  selector: 'app-profesionales',
  templateUrl: './profesionales.component.html'
})
export class ProfesionalesComponent implements OnInit {

  @ViewChild('autoShownModal') public autoShownModal: ModalDirective;
  model: Data = new Data();
  profesionales: Profesional[] = [];
  profesional: Profesional = new Profesional();
  especialidades: Especialidad[] = [];
  totalItems = 0;
  currentPage = 1;
  smallnumPages = 0;
  maxSize = 10;
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  subs: Subscription[] = [];

  deleteModal: ModalDirective;
  updateModal: ModalDirective;
  saveModal: ModalDirective;
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private store: Store,
              private storeService: StoreService,
              private alertService: AlertService,
              private router: Router,
              private  pagerService: PagerService,
              private adminService: AdminService) {

    this.form = fb.group({
      'nombre': [null, Validators.required],
      'apellido': [null, Validators.required]
    });

  }

  public setPage(page: number): void {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.profesionales.length, page);

    // get current page of items
    this.pagedItems = this.profesionales.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.currentPage = page;
    this.totalItems = this.pager.totalPages * this.maxSize;
  }

  public pageChanged(event: any): void {
    this.setPage(event.page);
  }

  ngOnInit(): void {

    this.subs.push(
      this.store.changes.pluck('profesionales').subscribe(
        (data: any) => {
          this.profesionales = data;
          // this.setPage(this.pager.currentPage);
        }
      ));

    // initialize to page 1
    this.setPage(1);

  }

  public hideModal() {
    this.autoShownModal.hide();
  }

  public deleteProfesional() {
    const profesionales = this.storeService.get('profesionales');
    for (const x of profesionales) {
      if (x.id === this.profesional.id) {
        this.delete(x);
        this.storeService.findAndDelete('profesionales', x.id);
        break;
      }
    }
    this.deleteModal.hide();
  }

  showModal(profesional: Profesional) {
    this.saveModal.show();
    this.profesional = profesional;
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

  handleDeleteEvent(event) {
    this.deleteProfesional();
  }

  showDeleteModal(profesional: Profesional) {
    this.deleteModal.show();
    this.profesional = profesional;
  }

  showUpdateModal(profesional) {
    this.updateModal.show();
    this.profesional = profesional;
    this.model.apellido = profesional.apellido;
    this.model.nombre = profesional.nombre;
  }

  handleSaveEvent(event) {

  }

  submitSaveForm(value: Data) {
    const prof: Profesional = new Profesional();
    prof.nombre = value.nombre;
    prof.apellido = value.apellido;
    this.save(prof);
    this.clean();
  }

  save(profesional: Profesional) {
    this.adminService.saveProfesional(profesional)
      .then(() => {
        this.alertService.success('Se guardo exitosamente');
        this.saveModal.hide();
      })
      .catch(() => {
        this.saveModal.hide();
      });
  }

  actualizarProfesionales() {
    this.adminService.getProfesionales()
      .then(data => {
        this.storeService.update('profesionales', data);
      })
      .catch(() => {
        this.saveModal.hide();
      });
  }

  submitUpdateForm(value: Data) {
    if (value.nombre) {
      this.profesional.nombre = value.nombre;
    }
    if (value.apellido) {
      this.profesional.apellido = value.apellido;
    }
    this.update(this.profesional);
    this.clean();
  }

  update(profesional: Profesional) {
    this.adminService.updateProfesional(profesional)
      .then(() => {
        this.alertService.success('Se guardo exitosamente');
        this.updateModal.hide();
      })
      .catch(() => {
        this.updateModal.hide();
      });
  }

  delete(profesional: Profesional) {

    this.adminService.deleteProfesional(profesional).then(data => {
      this.alertService.success('Se borro exitosamente');
    });
  }

  clean() {
    this.form.reset();
  }

}

