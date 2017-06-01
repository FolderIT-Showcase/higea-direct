import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminHomeComponent} from './component/admin-home.component';
import {AdminGuard} from '../../service/guard/admin.guard';
import {CentrosSaludResolveService} from '../../service/resolve/centros-salud-resolve.service';
import {TurnoResolveService} from '../../service/resolve/turno-resolve.service';
import {TipoTurnoResolveService} from '../../service/resolve/tipo-turno-resolve.service';
import {EspecialidadResolveService} from '../../service/resolve/especialidad-resolve.service';
import {ProfesionalResolveService} from '../../service/resolve/profesionales-resolve.service';
import {ProfesionalesComponent} from './component/profesionales/profesionales.component';
import {CentrosSaludComponent} from './component/centros-salud/centros-salud.component';
import {EspecialidadesComponent} from './component/especialidades/especialidades.component';
import {TurnosComponent} from './component/turnos/turnos.component';

const routes: Routes = [
  {
    path: '', component: AdminHomeComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        redirectTo: 'turno',
        pathMatch: 'full'
      },
      {
        path: 'turno',
        component: TurnosComponent,
        resolve: {
          centrosSalud: CentrosSaludResolveService,
          turnos: TurnoResolveService,
          tiposTurnos: TipoTurnoResolveService
        }
      },
      {
        path: 'especialidad',
        component: EspecialidadesComponent,
        resolve: {
          especialidades: EspecialidadResolveService,
          profesionales: ProfesionalResolveService
        }
      },
      {
        path: 'centro-salud',
        component: CentrosSaludComponent,
        resolve: {
          centrosSalud: CentrosSaludResolveService,
          especialidades: EspecialidadResolveService
        }
      },
      {
        path: 'profesional',
        component: ProfesionalesComponent,
        resolve: {
          profesionales: ProfesionalResolveService
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AdminRoutingModule {
}
