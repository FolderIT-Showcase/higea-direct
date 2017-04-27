import {Component, OnInit} from '@angular/core';
import {Turno} from '../../../core/domain/turno';
import {Persona} from '../../../core/domain/persona';
import {StoreService} from '../../../core/service/store.service';

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

  constructor(private storeService: StoreService) {
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

}
