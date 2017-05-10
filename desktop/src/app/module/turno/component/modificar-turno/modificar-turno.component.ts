import {Component, OnInit} from '@angular/core';
import {Turno} from '../../../core/domain/turno';
import {Persona} from '../../../core/domain/persona';
import {StoreService} from '../../../core/service/store.service';
import {ModalDirective} from 'ngx-bootstrap';
import {TurnoService} from '../../../core/service/turno.service';
import {AlertService} from '../../../core/service/alert.service';
import {Especialidad} from '../../../core/domain/especialidad';
import {CentroSalud} from '../../../core/domain/centro-salud';
import {FormBuilder, FormGroup} from '@angular/forms';

class Data {
  persona: Persona;
}

@Component({
  selector: 'app-modificar-turno',
  templateUrl: './modificar-turno.component.html'
})
export class ModificarTurnoComponent implements OnInit {

  turnos: Turno[] = [];
  personas: Persona[] = [];
  model: Data = new Data();
  turno: Turno = new Turno();

  modal: ModalDirective;
  form: FormGroup;

  constructor(private storeService: StoreService,
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
  }

  handlePersonaClick(persona: Persona) {
    this.turnos = persona.turno;
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

  submitForm(form) {

  }

  public eliminarTurno(turno: Turno) {
    this.turnoService.cancelarTurno(turno)
      .then(() => {
        this.alertService.success('Turno cancelado exitosamente');
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleModal(event) {
    this.modal = event;
  }

  hideModal() {
    this.modal.hide();
  }

}
