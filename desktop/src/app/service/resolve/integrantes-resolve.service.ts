import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {PersonaService} from '../persona.service';

@Injectable()
export class IntegrantesResolveService implements Resolve<any> {

  constructor(private personaService: PersonaService) {
  }

  resolve(): Promise<any> {
    return this.personaService.getIntegrantes();
  }

}
