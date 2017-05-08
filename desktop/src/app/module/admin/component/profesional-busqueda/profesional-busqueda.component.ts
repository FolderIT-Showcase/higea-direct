import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {StoreService} from '../../../core/service/store.service';
import {Store} from '../../../core/service/store';
import {Profesional} from '../../../core/domain/profesional';
import {PagerService} from '../../../core/service/pager.service';
import {Especialidad} from '../../../core/domain/especialidad';

@Component({
  selector: 'app-profesional-busqueda',
  templateUrl: './profesional-busqueda.component.html'
})

export class ProfesionalBusquedaComponent implements OnInit, OnDestroy {

  profesionales: Profesional[] = [];
  especialidad: Especialidad;
  profesional: Profesional = new Profesional();
  subs: Subscription[] = [];

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
              private pagerService: PagerService) {
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

  ngOnInit() {
    this.profesionales = this.storeService.get('profesionales');
    this.subs.push(
      this.store.changes.pluck('especialidad').subscribe(
        (data: any) => {
          this.especialidad = data;
          this.profesionales.forEach(x => {
            x.seleccionado = false;
          });
          this.updatedSelected();
          this.pagedItems = this.profesionales.slice(this.pager.startIndex, this.pager.endIndex + 1);
        }));

    // initialize to page 1
    this.setPage(1);
  }

  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }

  public toggleProfesional(profesional: Profesional) {

    if (!this.especialidad) {
      this.especialidad = new Especialidad();
    }

    if (!this.especialidad.profesional) {
      this.especialidad.profesional = [];
    }

    const element = this.especialidad.profesional.find(x => x.id === profesional.id);

    if (element) {
      this.especialidad.profesional = this.especialidad.profesional.filter(x => x.id !== profesional.id);
      this.storeService.update('profesionalesSeleccionados', this.especialidad.profesional);
      profesional.seleccionado = false;
      return;
    }
    this.especialidad.profesional.push(profesional);
    this.storeService.update('profesionalesSeleccionados', this.especialidad.profesional);
    profesional.seleccionado = true;
  }

  updatedSelected() {
    if (!this.especialidad || !this.especialidad.profesional || !this.profesionales) {
      return;
    }

    this.profesionales.forEach(x => {
      this.especialidad.profesional.forEach(y => {
        if (x.id === y.id) {
          x.seleccionado = true;
        }
      })
    });

  }
}
