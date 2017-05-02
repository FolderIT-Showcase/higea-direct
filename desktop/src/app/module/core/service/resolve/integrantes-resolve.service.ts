import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {PersonaService} from '../persona.service';
import {LoadingService} from '../loading.service';

@Injectable()
export class IntegrantesResolveService implements Resolve<any> {

  constructor(private personaService: PersonaService, private loadingService: LoadingService) {
  }

  resolve(): Promise<any> {
    this.loadingService.start();
    return this.personaService.getIntegrantes()
      .then(() => {
        this.loadingService.finish();
      })
      .catch(() => {
        this.loadingService.finish();
      });
  }

}
