import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TurnoExternalComponent} from './turno-external/turno-external.component';
import {MetadataResolveService} from '../../service/resolve/metadata-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: TurnoExternalComponent,
    resolve: {
      metadata: MetadataResolveService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class TurnoRoutingModule {
}
