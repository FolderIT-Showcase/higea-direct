import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-switch',
  templateUrl: './switch-turno.component.html'
})
export class SwitchTurnoComponent implements OnInit {

  coreMode = true;

  constructor() {

  }

  ngOnInit(): void {
    const license = localStorage.getItem('license');
    console.log('License:' + license);
    if (license === 'core') {
      this.coreMode = true;
    } else {
      this.coreMode = false;
    }

  }
}
