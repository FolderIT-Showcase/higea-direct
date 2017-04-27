import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Persona} from '../../domain/persona';
import {PersonaService} from '../persona.service';
import {LoadingService} from '../loading.service';

@Injectable()
export class IntegrantesResolveService implements Resolve<Persona[]> {

  constructor(private personaService: PersonaService, private loadingService: LoadingService) {
  }

  resolve(): Promise<Persona[]> {
    this.loadingService.start();
    return this.personaService.getIntegrantes()
      .then(() => {
        this.loadingService.finish();
      });
  }

}
