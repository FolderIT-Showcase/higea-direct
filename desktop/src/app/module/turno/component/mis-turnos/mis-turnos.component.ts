import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Turno} from '../../../core/domain/turno';
import {Persona} from '../../../core/domain/persona';
import {StoreService} from '../../../core/service/store.service';
import {ModalDirective} from 'ngx-bootstrap';
import {TurnoService} from '../../../core/service/turno.service';
import {AlertService} from '../../../core/service/alert.service';
import {Especialidad} from '../../../core/domain/especialidad';
import {CentroSalud} from '../../../core/domain/centro-salud';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {Store} from '../../../core/service/store';
import {UtilsService} from '../../../core/service/utils.service';

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
    this.turnos = this.personas[0].turno;

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
        this.turnos = data.turno;
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
    this.turnos = persona.turno;
  }

  public showModal(turno: Turno) {
    this.persona =
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

}
