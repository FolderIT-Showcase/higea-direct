import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MisTurnosComponent} from './mis-turnos/mis-turnos.component';

const routes: Routes = [
  {
    path: '',
    component: MisTurnosComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ListaTurnosRoutingModule {
}
