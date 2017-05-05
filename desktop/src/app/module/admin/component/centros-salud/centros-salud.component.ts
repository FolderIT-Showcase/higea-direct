import {Component, OnInit} from '@angular/core';
import {CentroSalud} from '../../../core/domain/centro-salud';
import {StoreService} from '../../../core/service/store.service';
import {Profesional} from '../../../core/domain/profesional';
import {Especialidad} from '../../../core/domain/especialidad';
import {TurnoService} from '../../../core/service/turno.service';
import {AlertService} from '../../../core/service/alert.service';
import {AdminService} from '../../../core/service/admin.service';
import {ModalDirective} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {Store} from '../../../core/service/store';
import {PagerService} from '../../../core/service/pager.service';

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
              private turnoService: TurnoService,
              private alertService: AlertService,
              private adminService: AdminService) {

    this.form = fb.group({
      'centroSaludName': [null, Validators.required],
    });
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
    console.log('paginas' + this.pager.totalPages);
    this.totalItems = this.pager.totalPages * this.maxSize;
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

  crear(value: Data) {
    this.especialidades = this.storeService.get('especialidadesSeleccionadas');
    console.log('Especialidad nombre: ' + value.centroSaludName);
    const centroSalud = new CentroSalud();
    centroSalud.nombre = value.centroSaludName.toUpperCase();
    centroSalud.especialidad = this.especialidades;

    this.adminService.saveCentroSalud(centroSalud).then(data => {
      this.alertService.success('Se guardo exitosamente');
      this.saveModal.hide();

    })
      .catch((error) => {
        console.log(error);
        this.alertService.error('Error inesperado');
        this.saveModal.hide();
      });

  }

  clean() {
    this.especialidades = [];
  }


  handleSaveModal(event) {
    this.saveModal = event;
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
    const centros = this.storeService.get('centrosSalud');
    for (const x of centros) {
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
    })
      .catch((error) => {
        console.log("Error" + error);
        this.alertService.error(error.body);
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
  }

  submitUpdateForm(value: Data) {
    console.log(value);
    if (value.centroSaludName) {
      this.centro.nombre = value.centroSaludName;
    }

    this.update(this.centro);
  }

  update(centroSalud: CentroSalud) {
    this.adminService.updateCentroSalud(centroSalud).then(data => {
      this.alertService.success('Se guardo exitosamente');
      this.updateModal.hide();
    })
      .catch((error) => {
        console.log(error);
        this.alertService.error('Error al querer guardar el Centro de Salud');
      });
  }

}
