import {Component, OnInit} from '@angular/core';
import {CentroSalud} from '../../../../domain/centro-salud';
import {StoreService} from '../../../../service/store.service';
import {Profesional} from '../../../../domain/profesional';
import {Especialidad} from '../../../../domain/especialidad';
import {TurnoService} from '../../../../service/turno.service';
import {AlertService} from '../../../../service/alert.service';
import {AdminService} from '../../../../service/admin.service';
import {ModalDirective} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {Store} from '../../../../service/store';
import {PagerService} from '../../../../service/pager.service';

class Data {
  centroSaludName: string;
}

@Component({
  selector: 'app-centros-salud',
  templateUrl: './centros-salud.component.html'
})
export class CentrosSaludComponent implements OnInit {

  centro: CentroSalud = new CentroSalud();
  centros: CentroSalud[] = [];
  model: Data = new Data();
  especialidades: Especialidad[] = [];
  profesionales: Profesional[] = [];

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
              private  pagerService: PagerService,
              private storeService: StoreService,
              private alertService: AlertService,
              private adminService: AdminService) {

    this.form = fb.group({
      'centroSaludName': [null, Validators.required],
    });
  }

  ngOnInit() {
    this.subs.push(
      this.store.changes.pluck('centrosSalud').subscribe(
        (data: any) => {
          this.centros = data;
          this.pagedItems = this.centros.slice(this.pager.startIndex, this.pager.endIndex + 1);
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
    this.pager = this.pagerService.getPager(this.centros.length, page);

    // get current page of items
    this.pagedItems = this.centros.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.currentPage = page;
    this.totalItems = this.pager.totalPages * this.maxSize;
  }

  crear(value: Data) {
    this.especialidades = this.storeService.get('especialidadesSeleccionadas')

    if (!this.especialidades || this.especialidades.length === 0) {
      this.alertService.error('Debe seleccionar las especialidades asociadas al centro de salud');
      return;
    }

    this.centro.nombre = value.centroSaludName.toUpperCase();
    this.centro.especialidad = this.especialidades;

    this.adminService.saveCentroSalud(this.centro).then(data => {
      this.alertService.success('Se guardo exitosamente');
    });

    this.saveModal.hide();
  }

  clean() {
    this.form = this.fb.group({
      'centroSaludName': [null, Validators.required],
    });
    this.model = new Data();
  }

  handleSaveModal(event) {
    this.saveModal = event;
  }

  showSaveModal() {
    this.clean();
    this.centro = new CentroSalud();
    this.saveModal.show();
    this.storeService.update('centroSalud', this.centro);
  }

  showDeleteModal(centro: CentroSalud) {
    this.deleteModal.show();
    this.centro = centro;
  }

  showUpdateModal(centro: CentroSalud) {
    this.updateModal.show();
    this.centro = centro;
    this.model.centroSaludName = centro.nombre;
    this.storeService.update('centroSalud', centro);
  }

  handleDeleteModal(event) {
    this.deleteModal = event;
  }

  public deleteCentroSalud() {
    const centrosSalud = this.storeService.get('centrosSalud');
    for (const x of centrosSalud) {
      if (x.id === this.centro.id) {
        this.delete(x);
        this.storeService.findAndDelete('centrosSalud', x.id);
        break;
      }
    }
    this.deleteModal.hide();

  }

  delete(centro: CentroSalud) {
    this.adminService.deleteCentroSalud(centro).then(data => {
      this.alertService.success('Se borro exitosamente');
    });
  }

  public pageChanged(event: any): void {
    this.setPage(event.page);
  }

  handleUpdateModal(event) {
    this.updateModal = event;
  }

  submitSaveForm(value: Data) {
    this.crear(value);
    this.clean();
  }

  submitUpdateForm(value: Data) {
    if (value.centroSaludName) {
      this.centro.nombre = value.centroSaludName;
    }
    const especialidades = this.storeService.get('especialidadesSeleccionadas');
    if (!especialidades || especialidades.length === 0) {
      this.alertService.error('Debe seleccionar las especialidades asociadas al centro de salud');
      return;
    }
    this.update(this.centro);
    this.clean();
  }

  update(centroSalud: CentroSalud) {
    this.adminService.updateCentroSalud(centroSalud).then(data => {
      this.alertService.success('Se guardo exitosamente');
    });
    this.updateModal.hide();
  }

}
