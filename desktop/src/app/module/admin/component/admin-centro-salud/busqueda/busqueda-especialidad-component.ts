import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';


import {Subscription} from 'rxjs/Subscription';



import {Router} from '@angular/router';
import {AlertService} from "../../../../core/service/alert.service";
import {StoreService} from "../../../../core/service/store.service";
import {TurnoService} from "../../../../core/service/turno.service";
import {Store} from "../../../../core/service/store";
import {CentroSalud} from "../../../../core/domain/centro-salud";
import {Turno} from "../../../../core/domain/turno";
import {Persona} from "../../../../core/domain/persona";
import {Profesional} from "../../../../core/domain/profesional";
import {PagerService} from "../../../../core/service/pager.service";
import {Especialidad} from "../../../../core/domain/especialidad";

@Component({
  selector: 'app-especialidad-busqueda',
  templateUrl: './busqueda-especialidad.component.html',
  styleUrls: ['./busqueda-especialidad.component.scss']
})

export class BusquedaEspecialidadComponent implements OnInit, OnDestroy {

  @ViewChild('autoShownModal') public autoShownModal: ModalDirective;
  @ViewChild('infoModal') public infoModal: ModalDirective;


  especialidades: Especialidad[] = [];
  especialidadesSelected: Especialidad[] = [];
  especialidad: Especialidad = new Especialidad();
  subs: Subscription[] = [];
  public isModalShown = false;
  public isInfoModalShown = false;

  public totalItems: number = 0;
  public currentPage: number = 1;
  public smallnumPages: number = 0;
  public maxSize:number = 10;
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];


  constructor(private store: Store,
              private storeService: StoreService,
              private alertService: AlertService,
              private router: Router,
              private  pagerService: PagerService) {
  }

  public setPage(page: number): void {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.especialidades.length, page);

    // get current page of items
    this.pagedItems = this.especialidades.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.currentPage = page ;
    console.log("paginas"+this.pager.totalPages);
    this.totalItems = this.pager.totalPages*this.maxSize;
  }

  public pageChanged(event: any): void {
    this.setPage(event.page);
  }

  ngOnInit(): void {

    this.subs.push(
      this.store.changes.pluck('especialidades').subscribe(
        (data: any) => {
          this.especialidades = data;
        }
      ));

    // initialize to page 1
    this.setPage(1);

  }

  ngOnDestroy(): void {
    this.subs.forEach(x => x.unsubscribe());
  }

  public asignar(especialidad: Especialidad) {

    let element =  this.especialidadesSelected.find(x => x.id === especialidad.id);
    if(element){this.hideModal();console.log("Repetido "+element); return};
    this.especialidadesSelected.push(especialidad);
    this.storeService.update('especialidadesSeleccionadas',  this.especialidadesSelected);
    this.hideModal();
    especialidad.seleccionado = true;

  }
  public showModal(especialidad: Especialidad) {

    this.especialidad = especialidad;

    this.isModalShown = true;
  }

  public clean(){
    this.especialidadesSelected = [];
  }
  public hideModal() {
    this.autoShownModal.hide();
  }

  public showInfoModal() {
    this.isInfoModalShown = true;
  }

  public hideInfoModal() {
    this.infoModal.hide();
  }

  public onHidden() {
    this.isModalShown = false;
  }
}
