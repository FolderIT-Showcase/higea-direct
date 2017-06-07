import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SwitchTurnoComponent} from './component/switch-turno/switch-turno.component';
import {IntegrantesResolveService} from '../../service/resolve/integrantes-resolve.service';
import {CentrosSaludResolveService} from '../../service/resolve/centros-salud-resolve.service';
import {EspecialidadResolveService} from '../../service/resolve/especialidad-resolve.service';
import {MisTurnosComponent} from './component/mis-turnos/mis-turnos.component';
import {TurnoHomeComponent} from './turno-home.component';
import {ProfesionalResolveService} from '../../service/resolve/profesionales-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: TurnoHomeComponent,
    children: [
      {
        path: 'nuevo',
        component: SwitchTurnoComponent,
        resolve: {
          integrantes: IntegrantesResolveService,
          centrosSalud: CentrosSaludResolveService
        }
      },
      {
        path: 'tomados',
        component: MisTurnosComponent,
        resolve: {
          integrantes: IntegrantesResolveService,
        }
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class TurnoRoutingModule {
}
