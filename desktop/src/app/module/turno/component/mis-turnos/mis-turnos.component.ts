import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Turno} from '../../../../domain/turno';
import {Persona} from '../../../../domain/persona';
import {StoreService} from '../../../../service/store.service';
import {ModalDirective} from 'ngx-bootstrap';
import {TurnoService} from '../../../../service/turno.service';
import {AlertService} from '../../../../service/alert.service';
import {Especialidad} from '../../../../domain/especialidad';
import {CentroSalud} from '../../../../domain/centro-salud';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {Store} from '../../../../service/store';
import {UtilsService} from '../../../../service/utils.service';

class Data {
  persona: Persona;
}

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html'
})
export class MisTurnosComponent implements OnInit, OnDestroy, AfterViewInit {

  turnos: Turno[] = [];
  turnosProximos: Turno[] = [];
  turnosHistorial: Turno[] = [];
  personas: Persona[] = [];
  persona: Persona;
  model: Data = new Data();
  turno: Turno = new Turno();

  modal: ModalDirective;
  form: FormGroup;
  subs: Subscription[] = [];
  desktopMode = true;

  constructor(private utilsService: UtilsService,
              private storeService: StoreService,
              private store: Store,
              private turnoService: TurnoService,
              private fb: FormBuilder,
              private alertService: AlertService) {
    this.turno.especialidad = new Especialidad;
    this.turno.especialidad.nombre = '';
    this.turno.centroSalud = new CentroSalud;
    this.turno.centroSalud.nombre = '';

  }

  ngOnInit() {

    this.personas = this.storeService.get('integrantes');
    this.form = this.fb.group({
      'persona': [this.personas[0]]
    });

    this.turnoService.getTurnoByPersonaId(this.personas[0].id)
      .then(data => {
        this.turnos = data;
      });

    this.turnos.forEach(x => {
      if (x.fecha <= Date.now()) {
        this.turnosHistorial.push(x);
      } else {
        this.turnosProximos.push(x);
      }
    });

    this.persona = this.personas[0];
    this.storeService.update('persona', this.personas[0]);

    this.subs.push(this.store.changes.pluck('persona').subscribe(
      (data: any) => {
        if (!data) {
          return;
        }
        this.persona = data;
        this.turnoService.getTurnoByPersonaId(this.persona.id)
          .then(turnos => {
            this.turnos = turnos;
          });
      }));
  }

  ngAfterViewInit(): void {
    this.desktopMode = (this.utilsService.getWidth()) >= 1000;
    this.subs.push(this.utilsService.getWidthResizeEvent().subscribe(data => {
      this.desktopMode = data >= 1000;
    }));
  }

  ngOnDestroy(): void {
    this.storeService.update('persona', null);
    this.storeService.update('turnos', []);
  }

  handlePersonaClick(persona: Persona) {
    this.storeService.update('persona', persona);
    this.persona = persona;
    this.turnoService.getTurnoByPersonaId(persona.id)
      .then(data => {
        this.turnos = data;
      });
  }

  public showModal(turno: Turno) {
    this.turno = turno;
    this.modal.show();
  }

  labelPersona(persona: Persona) {
    if (!persona) {
      return;
    }
    return (persona.nombre + ' ' + persona.apellido).toUpperCase();
  }

  public eliminarTurno(turno: Turno) {
    this.turnoService.cancelarTurno(turno, this.persona)
      .then(() => {
        this.alertService.success('Turno cancelado exitosamente');
      })
      .catch(error => {
        console.error(error);
      });
    this.modal.hide();
  }

  handleModal(event) {
    this.modal = event;
  }

  hideModal() {
    this.modal.hide();
  }

  clearTable() {
    this.storeService.update('turnos', []);
  }

}
