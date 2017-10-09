import {Component, Input, OnInit} from '@angular/core';
import {Turno} from '../../../domain/turno';
import {ModalDirective} from 'ngx-bootstrap';
import {Persona} from '../../../domain/persona';
import {TurnoService} from '../../../service/turno.service';
import {StoreService} from '../../../service/store.service';
import {Profesional} from '../../../domain/profesional';
import {Util} from '../../../service/utils.service';

@Component({
  selector: 'app-lista-turnos',
  templateUrl: './lista-turnos.component.html'
})
export class ListaTurnosComponent implements OnInit {
  @Input() turnos: Turno[] = [];
  @Input() desktopMode = false;
  @Input() mode = 'proximos'; // 'proximos' o 'historial'

  modalConfirmacion: ModalDirective;
  impimirModal: ModalDirective;
  turno: Turno = new Turno();
  persona: Persona;

  constructor(private turnoService: TurnoService, private storeService: StoreService) {
  }

  ngOnInit(): void {
    this.persona = this.storeService.get('persona');
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

  handleSuccessModal(event) {
    this.impimirModal = event;
  }

  showModalimpresion(turno: Turno) {
    this.turno = turno;
    this.impimirModal.show();
  }
  generarPDF() {
    this.turnoService.generarTurnoPDF(this.turno);
  }

  label(profesional: Profesional) {
    return Util.label([profesional.apellido, profesional.nombre]);
  }
}
