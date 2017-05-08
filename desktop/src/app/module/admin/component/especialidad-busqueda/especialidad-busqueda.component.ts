import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {StoreService} from '../../../core/service/store.service';
import {Store} from '../../../core/service/store';
import {PagerService} from '../../../core/service/pager.service';
import {Especialidad} from '../../../core/domain/especialidad';
import {CentroSalud} from '../../../core/domain/centro-salud';

@Component({
  selector: 'app-especialidad-busqueda',
  templateUrl: './especialidad-busqueda.component.html'
})

export class EspecialidadBusquedaComponent implements OnInit, OnDestroy {

  especialidades: Especialidad[] = [];
  especialidadesSelected: Especialidad[] = [];
  especialidad: Especialidad = new Especialidad();
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
  pagedItems: Especialidad[];
  centro: CentroSalud;

  constructor(private store: Store,
              private storeService: StoreService,
              private  pagerService: PagerService) {
  }

  ngOnInit(): void {
    this.especialidades = this.storeService.get('especialidades');

    this.subs.push(
      this.store.changes.pluck('centroSalud').subscribe(
        (data: any) => {
          this.centro = data;
          this.especialidades.forEach(x => {
            x.seleccionado = false;
          });
          this.updatedSelected();
          this.pagedItems = this.especialidades.slice(this.pager.startIndex, this.pager.endIndex + 1);
        }
      ));


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

  ngOnDestroy() {
    this.especialidades = null;
    this.centro = null;
    this.subs.forEach(x => x.unsubscribe());
  }

  public toggleEspecialidad(especialidad: Especialidad) {

    if (!this.centro) {
      this.centro = new CentroSalud();
    }

    if (!this.centro.especialidad) {
      this.centro.especialidad = [];
    }

    const element = this.centro.especialidad.find(x => x.id === especialidad.id);

    if (element) {
      this.centro.especialidad = this.centro.especialidad.filter(x => x.id !== especialidad.id);
      this.storeService.update('especialidadesSeleccionadas', this.centro.especialidad);
      especialidad.seleccionado = false;
      return
    }

    this.centro.especialidad.push(especialidad);
    this.storeService.update('especialidadesSeleccionadas', this.centro.especialidad);
    especialidad.seleccionado = true;
  }

  public showModal(especialidad: Especialidad) {
    this.especialidad = especialidad;
    this.isModalShown = true;
  }

  public clean() {
    this.especialidadesSelected = [];
  }

  public showInfoModal() {
    this.isInfoModalShown = true;
  }

  public onHidden() {
    this.isModalShown = false;
  }

  updatedSelected() {
    if (!this.centro || !this.centro.especialidad || !this.especialidades) {
      return;
    }

    this.especialidades.forEach(x => {
      this.centro.especialidad.forEach(y => {
        if (x.id === y.id) {
          x.seleccionado = true;
        }
      })
    });

  }

}
