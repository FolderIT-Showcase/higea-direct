import {Component} from '@angular/core';
import {StoreService} from '../../../../service/store.service';
import {Store} from '../../../../service/store';

@Component({
  selector: 'app-turno-external',
  templateUrl: './turno-external.component.html'
})
export class TurnoExternalComponent {

  steps = [];

  constructor(private storeService: StoreService, private store: Store) {
    this.steps = [
      {
        label: 'Selecciona el Paciente, Especialidad y Médico'
      },
      {
        label: 'Escoje los días disponibles'
      },
      {
        label: 'Escoje de los turnos disponibles'
      }
    ];
    this.storeService.update('steps', this.steps);

    this.store.changes.pluck('steps').subscribe((data: any) => this.steps = data);
  }

}
