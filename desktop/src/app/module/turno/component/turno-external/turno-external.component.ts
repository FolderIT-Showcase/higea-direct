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
        label: 'Escoje Paciente, Especialidad y Médico',
        order: 1
      },
      {
        label: 'Escoje los días disponibles',
        order: 2
      },
      {
        label: 'Escoje de los turnos disponibles',
        order: 3
      }
    ];
    this.storeService.update('steps', this.steps);

    this.store.changes.pluck('steps').subscribe((data: any) => this.steps = data);
  }

}
