import {Component} from '@angular/core';

@Component({
  selector: 'app-turno-external',
  templateUrl: './turno-external.component.html'
})
export class TurnoExternalComponent {
  licencia = localStorage.getItem('license');
}
