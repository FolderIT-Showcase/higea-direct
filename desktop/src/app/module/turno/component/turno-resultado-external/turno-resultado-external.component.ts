import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {Store} from '../../../../service/store';
import {Subscription} from 'rxjs/Subscription';
import {TurnoService} from '../../../../service/turno.service';
import {StoreService} from '../../../../service/store.service';
import {Persona} from '../../../../domain/persona';
import {Especialidad} from '../../../../domain/especialidad';
import {Profesional} from '../../../../domain/profesional';
import {UtilsService} from '../../../../service/utils.service';
import {Turno} from '../../../../domain/turno';
import {MotivoTurno} from '../../../../domain/motivo-turno';
import {MetadataService} from '../../../../service/metadata.service';

@Component({
  selector: 'app-turno-resultado-external',
  templateUrl: './turno-resultado-external.component.html'
})
export class TurnoResultadoExternalComponent implements OnInit, OnDestroy {

  @ViewChild('autoShownModal') public autoShownModal: ModalDirective;
  @ViewChild('infoModal') public infoModal: ModalDirective;

  turnos: Turno[] = [];
  turno: Turno = new Turno();
  subs: Subscription[] = [];
  persona: Persona;

  lat = -31.623357;
  lng = -60.704956;
  motivos: MotivoTurno[] = [];
  motivoTurno: MotivoTurno = new MotivoTurno();
  emptyResponse = undefined;

  turnoModal: ModalDirective;
  successModal: ModalDirective;
  desktopMode = true;

  constructor(private store: Store,
              private utilsService: UtilsService,
              private metadataService: MetadataService,
              private turnoService: TurnoService,
              private storeService: StoreService) {
    this.turno.especialidad = new Especialidad;
    this.turno.especialidad.nombre = '';
    this.turno.profesional = new Profesional();
    this.turno.profesional.nombre = '';

    this.subs.push(this.utilsService.getWidthResizeEvent().subscribe(data => {
      this.desktopMode = data >= 1000;
    }));
  }

  ngOnInit(): void {
    this.desktopMode = (this.utilsService.getWidth()) >= 1000;
    this.metadataService.getMotivosTurno().then((data: any) => this.motivos = data);
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
    turno.motivoTurno = this.motivoTurno;
    turno.plan = this.persona.plan;
    this.persona.turno.push(turno);
    this.turnoService.reservarTurno(turno, this.persona)
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
