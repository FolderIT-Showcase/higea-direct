import {Component, Input} from '@angular/core';
import {Turno} from '../../../../domain/turno';
import {ModalDirective} from 'ngx-bootstrap';
import {TurnoService} from '../../../../service/turno.service';
import {StoreService} from '../../../../service/store.service';

@Component({
  selector: 'app-turnos-proximos',
  templateUrl: './turnos-lista.component.html'
})
export class TurnosListaComponent {
  @Input() turnos: Turno[] = [];
  @Input() desktopMode = false;
  @Input() mode = 'proximos'; // 'proximos' o 'historial'

  modalConfirmacion: ModalDirective;
  turno: Turno = new Turno();

  constructor(private turnoService: TurnoService, private storeService: StoreService) {
  }

  handleModalConfirmacion(event) {
    this.modalConfirmacion = event;
  }

  showModal(turno: Turno) {
    this.turno = turno;
    this.modalConfirmacion.show();
  }

  confirmDeleteModal() {
    const persona = this.storeService.get('persona');
    this.turnoService.cancelarTurno(this.turno, persona);
    this.modalConfirmacion.hide();
  }
}
