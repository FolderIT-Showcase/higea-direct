import {Component} from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch-turno.component.html'
})
export class SwitchTurnoComponent {

  coreMode = true;

  constructor() {
    const license = localStorage.getItem('license');
    this.coreMode = license === 'core';
  }
}
