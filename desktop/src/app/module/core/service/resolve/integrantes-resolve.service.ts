import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Persona} from '../../domain/persona';
import {PersonaService} from '../persona.service';

@Injectable()
export class IntegrantesResolveService implements Resolve<Persona[]> {

  constructor(private personaService: PersonaService) {
  }

  resolve(): Promise<Persona[]> {
    return this.personaService.getIntegrantes();
  }

}
