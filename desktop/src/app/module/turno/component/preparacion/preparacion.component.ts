import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Turno} from '../../../../domain/turno';
import {StoreService} from 'app/service/store.service';
import {Persona} from '../../../../domain/persona';

@Component({
  selector: 'app-preparacion',
  templateUrl: './preparacion.component.html'
})
export class PreparacionComponent implements OnInit, OnDestroy {

  turnos: Turno[] = [];

  @Input()
  persona: Persona;

  constructor(private storeService: StoreService) {
  }

  ngOnInit() {
    this.persona = this.storeService.get('persona');
    this.turnos = this.persona.turno;
  }

  ngOnDestroy(): void {

  }

}
