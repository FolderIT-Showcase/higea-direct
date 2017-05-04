import {Component, OnInit} from '@angular/core';
import {Turno} from '../../../core/domain/turno';
import {Persona} from '../../../core/domain/persona';
import {StoreService} from '../../../core/service/store.service';
import {ModalDirective} from 'ngx-bootstrap';
import {TurnoService} from '../../../core/service/turno.service';
import {AlertService} from '../../../core/service/alert.service';
import {Especialidad} from '../../../core/domain/especialidad';
import {CentroSalud} from '../../../core/domain/centro-salud';

class Data {
  persona: Persona;
}

@Component({
  selector: 'app-modificar-turno',
  templateUrl: './modificar-turno.component.html',
  styleUrls: ['./modificar-turno.component.scss']
})
export class ModificarTurnoComponent implements OnInit {

  turnos: Turno[] = [];
  personas: Persona[] = [];
  model: Data = new Data();
  public isModalShown = false;
  turno: Turno = new Turno();

  modal: ModalDirective;

  constructor(private storeService: StoreService,
              private turnoService: TurnoService,
              private alertService: AlertService) {
    this.turno.especialidad = new Especialidad;
    this.turno.especialidad.nombre = '';
    this.turno.centroSalud = new CentroSalud;
    this.turno.centroSalud.nombre = '';
  }

  ngOnInit() {
    this.personas = this.storeService.get('integrantes');
    this.model.persona = this.personas[0];
    this.turnos = this.personas[0].turno;
  }

  handlePersonaClick(persona: Persona) {
    this.model.persona = persona;
    this.turnos = persona.turno;
  }

  public showModal(turno: Turno) {
    this.turno = turno;
    console.log(turno);
    this.modal.show();
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
