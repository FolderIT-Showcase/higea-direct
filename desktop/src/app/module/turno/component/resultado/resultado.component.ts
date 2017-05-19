import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {Turno} from 'app/module/core/domain/turno';
import {CentroSalud} from '../../../core/domain/centro-salud';
import {Store} from '../../../core/service/store';
import {Subscription} from 'rxjs/Subscription';
import {TurnoService} from '../../../core/service/turno.service';
import {StoreService} from '../../../core/service/store.service';
import {Persona} from '../../../core/domain/persona';
import {Especialidad} from '../../../core/domain/especialidad';
import {Profesional} from '../../../core/domain/profesional';
import {UtilsService} from '../../../core/service/utils.service';

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

  lat = -31.623357;
  lng = -60.704956;
  emptyResponse = undefined;

  turnoModal: ModalDirective;
  successModal: ModalDirective;
  desktopMode = true;

  constructor(private store: Store,
              private utilsService: UtilsService,
              private turnoService: TurnoService,
              private storeService: StoreService) {
    this.turno.especialidad = new Especialidad;
    this.turno.especialidad.nombre = '';
    this.turno.centroSalud = new CentroSalud;
    this.turno.centroSalud.nombre = '';
    this.turno.profesional = new Profesional();
    this.turno.profesional.nombre = '';

    this.desktopMode = (this.utilsService.getWidth()) >= 900;

    this.subs.push(this.utilsService.getWidthResizeEvent().subscribe(data => {
      this.desktopMode = data >= 900;
    }));
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
          if (!data) {
            this.emptyResponse = true;
            return;
          }
          this.emptyResponse = false;
          this.turnos = data;
        }
      ));
  }

  ngOnDestroy(): void {
    this.subs.forEach(x => x.unsubscribe());
    this.storeService.update('turnos', []);
  }

  public showTurnoModal(turno: Turno) {
    this.turno = turno;
    this.turnoModal.show();
    this.persona = this.storeService.get('persona');
  }

  public reservarTurno(turno: Turno) {

    this.turnoModal.hide();

    if (!this.persona.turno) {
      this.persona.turno = [];
    }

    turno.tomado = true;
    this.persona.turno.push(turno);
    this.turnoService.reservarTurno(this.persona)
      .then(() => {
        this.successModal.show();
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleTurnoModal(event) {
    this.turnoModal = event;
  }

  handleSuccessModal(event) {
    this.successModal = event;
  }

}
