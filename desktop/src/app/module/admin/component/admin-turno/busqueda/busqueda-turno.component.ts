import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import {AlertService} from '../../../../core/service/alert.service';
import {StoreService} from '../../../../core/service/store.service';
import {TurnoService} from '../../../../core/service/turno.service';
import {Store} from '../../../../core/service/store';
import {CentroSalud} from '../../../../core/domain/centro-salud';
import {Turno} from '../../../../core/domain/turno';
import {Persona} from '../../../../core/domain/persona';

@Component({
  selector: 'app-admin-busqueda',
  templateUrl: './busqueda-turno.component.html',
  styleUrls: ['./busqueda-turno.component.scss']
})

export class BusquedaTurnoComponent implements OnInit, OnDestroy {

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
              private turnoService: TurnoService,
              private storeService: StoreService,
              private alertService: AlertService,
              private router: Router) {
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
    console.log(this.persona);
  }

  public deleteTurno(turno: Turno) {
    const turnos: Turno[] = this.storeService.get('turnos');
    for (const x of turnos) {
      if (x.id === this.turno.id) {
        this.storeService.findAndDelete('turnos', x.id);
        break;
      }
    }

    console.log('id turno ' + turno.id);
    this.turnoService.borrarTurno(turno, true)
      .then(() => {
        // this.router.navigate(['/nuevo-turno'])
//        this.infoModal.show();
        this.hideModal();
        this.showInfoModal();
      })
      .catch(error => {
        console.error(error);
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
