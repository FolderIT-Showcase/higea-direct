import {Component, OnInit, ViewChild} from '@angular/core';
import {Profesional} from '../../core/domain/profesional';
import {StoreService} from '../../core/service/store.service';
import {AlertService} from '../../core/service/alert.service';
import {AdminService} from '../../core/service/admin.service';
import {Store} from '../../core/service/store';
import {PagerService} from '../../core/service/pager.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {ModalDirective} from 'ngx-bootstrap';


class Data {
  especialidadName: string;
  especialidadSurname: string;
}
@Component({
  selector: 'app-profesionales',
  templateUrl: './profesionales.component.html',
  styleUrls: ['./profesionales.component.scss']
})
export class ProfesionalesComponent implements OnInit {

  @ViewChild('autoShownModal') public autoShownModal: ModalDirective;
  model: Data = new Data();
  especialidadName: string;
  especialidadSurname: string;
  profesionales: Profesional[] = [];

  public isModalShown = false;
  public isInfoModalShown = false;

  public totalItems = 0;
  public currentPage = 1;
  public smallnumPages = 0;
  public maxSize = 10;
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  subs: Subscription[] = [];
  deleteModal: ModalDirective;
  saveModal: ModalDirective;
  saveSubmitted = false;
  profesional: Profesional = new Profesional();

  constructor(private store: Store,
              private storeService: StoreService,
              private alertService: AlertService,
              private router: Router,
              private  pagerService: PagerService,
              private adminService: AdminService) {
  }

  crear(): void {

    const profesional = new Profesional();
    profesional.nombre = this.model.especialidadName.toUpperCase();
    profesional.apellido = this.model.especialidadSurname.toUpperCase();
    this.adminService.saveProfesional(profesional).then(data => {
      this.alertService.success('Se guardo exitosamente');
    })
      .catch((error) => {
        console.log(error);
        this.alertService.error('Error al querer guardar el Profesional');
      });

  }

  clearForm() {

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
    console.log('paginas' + this.pager.totalPages);
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
        }
      ));

    // initialize to page 1
    this.setPage(1);

  }

  public hideModal() {
    this.autoShownModal.hide();
  }

  public deleteProfesional() {
    const profesionales: Profesional[] = this.storeService.get('profesionales');
    for (const x of profesionales) {
      if (x.id === this.profesional.id) {
        this.storeService.findAndDelete('profesionales', x.id);
        break;
      }
    }
  }

  showModal(profesional: Profesional) {
    this.saveModal.show();
    this.profesional = profesional;
  }

  handleSaveModal(event) {
    this.saveModal = event;
  }

  handleDeleteModal(event) {
    this.deleteModal = event;
  }

  handleDeleteEvent(event) {
    this.deleteProfesional();
  }

  handleSaveEvent(event) {
    
  }

  templateDeleteModal() {
    return `
      <label>¿Querés dar de baja a este profesional?</label>
      <br>
      <label>
        <strong> ${this.profesional.nombre}</strong>
        <strong> ${this.profesional.apellido} </strong>
      </label>
    `;
  }

  templateSaveModal() {
    return `
          <form class="form-horizontal" name="f" (ngSubmit)="f.form.valid" #f="ngForm">
          <div class="row">
            <div class="col-sm-10">
              <div class="form-group" [ngClass]="{ 'has-error': f.submitted && !especialidadName.valid }">
                <label for="especialidadName" class="control-label">Nombre</label>
                <input id="especialidadName" type="text" class="form-control" name="especialidadName"
                       [(ngModel)]="model.especialidadName" #especialidadName="ngModel" required/>
                <div *ngIf="!especialidadName.valid" class="help-block">Nombre obligatorio</div>
              </div>
              <label for="especialidadSurname" class="control-label">Apellido</label>
              <div class="form-group" [ngClass]="{ 'has-error': f.submitted && !especialidadSurname.valid }">
                <input id="especialidadSurname" type="text" class="form-control" name="especialidadSurname"
                       [(ngModel)]="model.especialidadSurname" #especialidadName="ngModel" required/>
                <div *ngIf="!especialidadSurname.valid" class="help-block">Apellido obligatorio</div>
              </div>
            </div>
          </div>
        </form>
    `;
  }

}

