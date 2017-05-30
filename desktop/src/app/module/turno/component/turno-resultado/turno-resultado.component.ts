import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {Turno} from 'app/domain/turno';
import {CentroSalud} from '../../../../domain/centro-salud';
import {Store} from '../../../../service/store';
import {Subscription} from 'rxjs/Subscription';
import {TurnoService} from '../../../../service/turno.service';
import {StoreService} from '../../../../service/store.service';
import {Persona} from '../../../../domain/persona';
import {Especialidad} from '../../../../domain/especialidad';
import {Profesional} from '../../../../domain/profesional';
import {UtilsService} from '../../../../service/utils.service';

@Component({
  selector: 'app-turno-resultado',
  templateUrl: './turno-resultado.component.html'
})
export class TurnoResultadoComponent implements OnInit, OnDestroy, AfterViewInit {

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

  ngAfterViewInit(): void {
    this.desktopMode = (this.utilsService.getWidth()) >= 1000;
    this.subs.push(this.utilsService.getWidthResizeEvent().subscribe(data => {
      this.desktopMode = data >= 1000;
    }));
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
        this.storeService.update('turnos', []);
        this.successModal.show();
      })
      .catch(error => {
        this.storeService.update('turnos', []);
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
