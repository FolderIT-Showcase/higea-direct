import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './component/home/home.component';
import {LoginComponent} from '../auth/component/login/login.component';
import {RegisterComponent} from '../auth/component/register/register.component';
import {RegisterSocialComponent} from '../auth/component/register-social/register-social.component';
import {TurnoComponent} from '../turno/turno.component';
import {GrupoFamiliarComponent} from '../grupo-familiar/grupo-familiar.component';
import {UserActiveComponent} from '../auth/component/user-activate/user.active.component';
import {AuthGuard} from './service/guard/auth.guard';
import {PaisesResolveService} from './service/resolve/paises-resolve.service';
import {CentrosSaludResolveService} from './service/resolve/centros-salud-resolve.service';
import {IntegrantesResolveService} from './service/resolve/integrantes-resolve.service';
import {ModificarTurnoComponent} from '../turno/component/modificar-turno/modificar-turno.component';
import {AdminHomeComponent} from '../admin/component/admin-home.component';
import {ProfesionalResolveService} from './service/resolve/profesionales-resolve.service';
import {CoreComponent} from './core.component';
import {EspecialidadResolveService} from './service/resolve/especialidad-resolve.service';
import {TurnosComponent} from '../admin/component/turnos/turnos.component';
import {EspecialidadesComponent} from '../admin/component/especialidades/especialidades.component';
import {CentrosSaludComponent} from '../admin/component/centros-salud/centros-salud.component';
import {ProfesionalesComponent} from '../admin/component/profesionales/profesionales.component';
import {AdminGuard} from './service/guard/admin.guard';
import {TurnoResolveService} from './service/resolve/turno-resolve.service';
import {ProvinciaResolveService} from './service/resolve/provincia-resolve.service';


const appRoutes: Routes = [
  {
    path: '',
    component: CoreComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent,
        resolve: {
          integrantes: IntegrantesResolveService
        }
      },
      {
        path: 'nuevo-turno',
        component: TurnoComponent,
        resolve: {
          integrantes: IntegrantesResolveService,
          centrosSalud: CentrosSaludResolveService
        }
      },
      {
        path: 'mis-turnos',
        component: ModificarTurnoComponent,
        resolve: {
          integrantes: IntegrantesResolveService
        }
      },
      {
        path: 'grupo-familiar',
        component: GrupoFamiliarComponent,
        resolve: {
          paises: PaisesResolveService,
          provincias: ProvinciaResolveService
        }
      },
      {
        path: 'admin',
        component: AdminHomeComponent,
        canActivate: [AdminGuard],
        children: [
          {
            path: '',
            redirectTo: 'turno',
            pathMatch: 'full'
          },
          {
            path: 'turno', component: TurnosComponent,
            resolve: {
              centrosSalud: CentrosSaludResolveService,
              turnos: TurnoResolveService
            }
          },
          {
            path: 'especialidad', component: EspecialidadesComponent,
            resolve: {
              especialidades: EspecialidadResolveService,
              profesionales: ProfesionalResolveService
            }
          },
          {
            path: 'centro-salud', component: CentrosSaludComponent,
            resolve: {
              centrosSalud: CentrosSaludResolveService,
              especialidades: EspecialidadResolveService
            }
          },
          {
            path: 'profesional', component: ProfesionalesComponent,
            resolve: {
              profesionales: ProfesionalResolveService
            }
          }
        ]
      }]
  },
  {
    path: 'login',
    component: LoginComponent,
    resolve: {
      paises: PaisesResolveService,
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    resolve: {
      paises: PaisesResolveService,
    }
  },
  {
    path: 'register-social',
    component: RegisterSocialComponent,
    resolve: {
      paises: PaisesResolveService,
    }
  },
  {
    path: 'regitrationConfirm',
    component: UserActiveComponent
  },

  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
