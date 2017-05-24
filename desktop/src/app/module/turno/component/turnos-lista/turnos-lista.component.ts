import {Component, Input} from '@angular/core';
import {Turno} from '../../../core/domain/turno';

@Component({
  selector: 'app-turnos-proximos',
  templateUrl: './turnos-lista.component.html'
})
export class TurnosListaComponent {
  @Input() turnos: Turno[] = [];
  @Input() desktopMode = false;
  @Input() mode = 'proximos'; // 'proximos' o 'historial'
}
