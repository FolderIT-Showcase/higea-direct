import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {Subscription} from 'rxjs/Subscription';
import {StoreService} from '../../../core/service/store.service';
import {Store} from '../../../core/service/store';
import {CentroSalud} from '../../../core/domain/centro-salud';
import {Turno} from '../../../core/domain/turno';
import {Persona} from '../../../core/domain/persona';
import {AdminService} from '../../../core/service/admin.service';

@Component({
  selector: 'app-turno-busqueda',
  templateUrl: './turno-busqueda.component.html'
})

export class TurnoBusquedaComponent implements OnInit, OnDestroy {

  @ViewChild('autoShownModal') public autoShownModal: ModalDirective;
  @ViewChild('infoModal') public infoModal: ModalDirective;

  centro: CentroSalud = new CentroSalud();
  turnos: Turno[] = [];
  turno: Turno = new Turno();
  subs: Subscription[] = [];
  persona: Persona;
  public isModalShown = false;
  public isInfoModalShown = false;
  lat = -31.623357;
  lng = -60.704956;

  constructor(private store: Store,
              private adminService: AdminService,
              private storeService: StoreService,) {
  }

  ngOnInit(): void {
    this.subs.push(
      this.store.changes.pluck('CentroSalud').subscribe(
        (data: any) => {
          this.centro = data;
        }));
    this.subs.push(
      this.store.changes.pluck('turnos').subscribe(
        (data: any) => {
          this.turnos = data;
        }
      ));
  }

  ngOnDestroy(): void {
    this.subs.forEach(x => x.unsubscribe());
  }

  public showModal(turno: Turno) {
    this.turno = turno;
    this.isModalShown = true;
    this.persona = this.storeService.get('persona');
  }

  public deleteTurno() {
    const turnos: Turno[] = this.storeService.get('turnos');
    for (const x of turnos) {
      if (x.id === this.turno.id) {
        this.storeService.findAndDelete('turnos', x.id);
        break;
      }
    }

    this.adminService.deleteTurno(this.turno)
      .then(() => {
        this.hideModal();
      });
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
