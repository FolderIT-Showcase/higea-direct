import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {Turno} from 'app/module/core/domain/turno';
import {CentroSalud} from '../../../core/domain/centro-salud';
import {Store} from '../../../core/service/store';
import {Subscription} from 'rxjs/Subscription';
import {TurnoService} from '../../../core/service/turno.service';
import {StoreService} from '../../../core/service/store.service';
import {Persona} from '../../../core/domain/persona';
import {AlertService} from '../../../core/service/alert.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-busqueda',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss']
})
export class ResultadoComponent implements OnInit, OnDestroy {

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

  public reservarTurno(turno: Turno) {
    this.persona.turno.push(turno);
    this.turnoService.reservarTurno(this.persona)
      .then(() => {
        // this.router.navigate(['/nuevo-turno'])
        this.infoModal.show();
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
