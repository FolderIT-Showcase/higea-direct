import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Turno} from '../../../domain/turno';
import {Persona} from '../../../domain/persona';
import {ModalDirective} from 'ngx-bootstrap';
import {FormGroup} from '@angular/forms';
import {Util} from '../../../service/utils.service';
import {StoreService} from '../../../service/store.service';
import {TurnoService} from '../../../service/turno.service';
import {PersonaService} from '../../../service/persona.service';
import {AlertService} from '../../../service/alert.service';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html'
})
export class MisTurnosComponent implements OnInit, OnDestroy {

  turnos: Turno[] = [];
  turnosProximos: Turno[] = [];
  turnosHistorial: Turno[] = [];
  numeroDocumento = null;
  persona: Persona;
  turno: Turno = new Turno();

  modal: ModalDirective;
  form: FormGroup;
  desktopMode = true;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private utilsService: Util,
              private storeService: StoreService,
              private turnoService: TurnoService,
              private alertService: AlertService,
              private personaService: PersonaService) {

  }

  ngOnInit() {

    this.desktopMode = (Util.getWidth()) >= 1000;
    this.utilsService.getWidthResizeEvent()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(data => this.desktopMode = data >= 1000);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.storeService.update('persona', null);
    this.storeService.update('turnos', []);
  }

  buildTurnos(turnos) {
    if (!turnos) return;
    this.turnos = turnos;
    this.turnosHistorial = [];
    this.turnosProximos = [];
    this.turnos.forEach(x => {
      if (x.fecha <= Date.now()) this.turnosHistorial.push(x);
      else this.turnosProximos.push(x);
    });
  }

  handlePersonaClick(persona: Persona) {
    this.storeService.update('persona', persona);
    this.persona = persona;
    this.turnoService.getTurnoByPersonaId(persona.externalId).then(turnos => this.buildTurnos(turnos));
  }

  public showModal(turno: Turno) {
    this.turno = turno;
    this.modal.show();
  }

  labelPersona(persona: Persona) {
    if (!persona) return;
    return (`${persona.nombre} ${persona.apellido}`).toUpperCase();
  }

  clearTable() {
    this.storeService.update('turnos', []);
  }

  fetchTurnos() {

    this.buildTurnos([]);

    if (this.isDocumentoNotValid()) {
      this.alertService.error('Ingrese un número de documento válido por favor');
      return;
    }

    this.personaService.getPaciente(this.numeroDocumento)
      .then(data => {
        if (!data || data.status) {
          this.alertService.error('Usted no tiene turnos solicitados');
          return;
        }
        console.log(data);
        this.persona = data;
        return this.turnoService.getTurnoByPersonaId(this.persona.externalId);
      })
      .then(turnos => { console.log(turnos);
        this.buildTurnos(turnos)});

  }

  isDocumentoNotValid() {
    return (
      !this.numeroDocumento ||
      isNaN(this.numeroDocumento) ||
      this.numeroDocumento.toString().length < 8 ||
      this.numeroDocumento.toString().length > 11
    );
  }

  dismissAlert(){
    this.alertService.reset();
  }

}
