import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';


import {Subscription} from 'rxjs/Subscription';


import {Router} from '@angular/router';
import {AlertService} from '../../../../core/service/alert.service';
import {StoreService} from '../../../../core/service/store.service';
import {Store} from '../../../../core/service/store';
import {Profesional} from '../../../../core/domain/profesional';
import {PagerService} from '../../../../core/service/pager.service';

@Component({
  selector: 'app-profesional-busqueda',
  templateUrl: './busqueda-profesional.component.html',
  styleUrls: ['./busqueda-profesional.component.scss']
})

export class BusquedaProfesionalComponent implements OnInit, OnDestroy {

  @ViewChild('autoShownModal') public autoShownModal: ModalDirective;
  @ViewChild('infoModal') public infoModal: ModalDirective;


  profesionales: Profesional[] = [];
  profesionalesSelected: Profesional[] = [];
  profesional: Profesional = new Profesional();
  subs: Subscription[] = [];
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

  ngOnDestroy(): void {
    this.subs.forEach(x => x.unsubscribe());
  }

  public asignar(profesional: Profesional) {
    console.log('Entro ' + profesional);
    const element = this.profesionalesSelected.find(x => x.id === profesional.id);
    console.log('Element ' + element);
    if (element) {
      this.hideModal();
      return
    }
    ;
    this.profesionalesSelected.push(profesional);
    this.storeService.update('profesionalesSeleccionados', this.profesionalesSelected);
    this.hideModal();
    this.showInfoModal();

  }

  public showModal(profesional: Profesional) {
    this.profesional = profesional;

    this.isModalShown = true;
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