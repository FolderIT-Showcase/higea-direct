import {Component, OnDestroy, OnInit} from '@angular/core';
import {Turno} from '../../../../domain/turno';
import {Persona} from '../../../../domain/persona';
import {StoreService} from '../../../../service/store.service';
import {ModalDirective} from 'ngx-bootstrap';
import {TurnoService} from '../../../../service/turno.service';
import {AlertService} from '../../../../service/alert.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Util} from '../../../../service/utils.service';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html'
})
export class MisTurnosComponent implements OnInit, OnDestroy {

  turnos: Turno[] = [];
  turnosProximos: Turno[] = [];
  turnosHistorial: Turno[] = [];
  personas: Persona[] = [];
  persona: Persona;
  turno: Turno = new Turno();

  modal: ModalDirective;
  form: FormGroup;
  desktopMode = true;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private utilsService: Util,
              private storeService: StoreService,
              private turnoService: TurnoService,
              private fb: FormBuilder,
              private alertService: AlertService) {

  }

  ngOnInit() {
    this.personas = this.storeService.get('integrantes');
    this.form = this.fb.group({
      'persona': [this.personas[0]]
    });
    this.persona = this.personas[0];
    this.storeService.update('persona', this.personas[0]);
    this.turnoService.getTurnoByPersonaId(this.persona.externalId).then(turnos => this.buildTurnos(turnos));

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

}
