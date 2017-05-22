import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-turno-external',
  templateUrl: './turno-external.component.html'
})
export class TurnoExternalComponent implements OnInit {

  licencia = localStorage.getItem('license');

  constructor() {

  }

  ngOnInit(): void {


  }

}
