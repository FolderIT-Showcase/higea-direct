import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GrupoFamiliarComponent} from './grupo-familiar.component';
import {IntegrantesResolveService} from '../../service/resolve/integrantes-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: GrupoFamiliarComponent,
    resolve: {
      integrantes: IntegrantesResolveService
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class GrupoFamiliarRoutingModule { }
