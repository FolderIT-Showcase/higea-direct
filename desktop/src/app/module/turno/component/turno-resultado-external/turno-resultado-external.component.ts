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
import {DatePipe} from '@angular/common';

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
  timeline: Turno[] = [];
  clickCounter = 0;

  constructor(private store: Store,
              private metadataService: MetadataService,
              private turnoService: TurnoService,
              private storeService: StoreService) {
    this.turno.especialidad = new Especialidad;
    this.turno.especialidad.nombre = '';
    this.turno.profesional = new Profesional();
    this.turno.profesional.nombre = '';
  }

  ngOnInit(): void {
    this.metadataService.getMotivosTurno().then((data: any) => this.motivos = data);
    this.subs.push(
      this.store.changes.pluck('turnos').subscribe(
        (data: any) => {
          this.clickCounter++;
          console.log(this.clickCounter);
          if (!data[0]) {
            this.buildTimeline([]);
            return;
          }
          this.turnos = data;
          this.buildTimeline(this.turnos);
        }
      ));
  }

  ngOnDestroy(): void {
    this.subs.forEach(x => x.unsubscribe());
    this.storeService.update('turnos', []);
  }

  buildTimeline(turnos: Turno[]) {

    // duracion en minutos
    let duracion = 30;
    this.timeline = [];
    if (turnos && turnos[0] && turnos[0].duracion) {
      duracion = turnos[0].duracion;
    }

    const baseMin = 0;
    const minHour = 8;
    const maxHour = 20;

    for (let i = minHour; i < maxHour; i++) {

      let date = new Date().setHours(i, baseMin, 0, 0);
      let turno = new Turno();
      turno.hora = date;
      this.timeline.push(turno);

      for (let j = duracion; j !== 0; j = (j + duracion) % 60) {

        let date = new Date().setHours(i, j, 0, 0);
        let turno = new Turno();
        turno = new Turno();
        turno.hora = date;

        for (let turnoEnabled of this.turnos) {
          const dateTimeline = new Date(turno.hora);
          const date = new Date(turnoEnabled.hora);
          if (dateTimeline.getHours() === date.getHours() &&
            dateTimeline.getMinutes() === date.getMinutes()) {
            turnoEnabled.enabled = true;
            turno = turnoEnabled;
            console.log(turno);
            console.log(`${date.getHours()}:${date.getMinutes()}`);
          }
        }
        this.timeline.push(turno);
      }
    }

    let date = new Date().setHours(maxHour, baseMin, 0, 0);
    let turno = new Turno();
    turno.hora = date;
    this.timeline.push(turno);

  }

  public showTurnoModal(turno: Turno) {
    if (!turno.enabled) {
      return;
    }
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

  generarPDF() {
    this.turnoService.generarPDF(this.persona)
      .then(data => {
        // window.open(data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleMotivo(motivo) {
    this.motivoTurno = motivo;
  }

}
