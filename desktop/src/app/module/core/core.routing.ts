import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './component/home/home.component';
import {LoginComponent} from '../auth/component/login/login.component';
import {RegisterComponent} from '../auth/component/register/register.component';
import {RegisterSocialComponent} from '../auth/component/register-social/register-social.component';
import {TurnoComponent} from '../turno/turno.component';
import {GrupoFamiliarComponent} from '../grupo-familiar/grupo-familiar.component';
import {UserActiveComponent} from '../auth/component/user-activate/user.active.component';
import {AuthGuard} from './guard/auth.guard';
import {PaisesResolveService} from './service/resolve/paises-resolve.service';
import {CentrosSaludResolveService} from './service/resolve/centros-salud-resolve.service';
import {IntegrantesResolveService} from './service/resolve/integrantes-resolve.service';
import {ModificarTurnoComponent} from '../turno/component/modificar-turno/modificar-turno.component';
import {AdminHomeComponent} from '../admin/component/admin-home.component';
import {AltaTurnoComponent} from '../admin/component/admin-turno/alta-turno.component';
import {BajaTurnoComponent} from '../admin/component/admin-turno/baja-turno.component';
import {AltaEspecialidadComponent} from '../admin/component/admin-especialidad/alta-especialidad.component';
import {ProfesionalResolveService} from './service/resolve/profesionales-resolve.service';
import {CoreComponent} from './core.component';
import {AltaCentroSaludComponent} from '../admin/component/admin-centro-salud/alta-centro-salud-component';
import {EspecialidadResolveService} from './service/resolve/especialidad-resolve.service';

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
        component: HomeComponent
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
        component: GrupoFamiliarComponent
      },
      {
        path: 'admin',
        component: AdminHomeComponent,
        children: [
          {
            path: 'alta-turno', component: AltaTurnoComponent,
            resolve: {
              centrosSalud: CentrosSaludResolveService
            }
          },
          {
            path: 'baja-turno',
            component: BajaTurnoComponent,
            resolve: {
              centrosSalud: CentrosSaludResolveService
            }
          },
          {
            path: 'alta-especialidad',
            component: AltaEspecialidadComponent,
            resolve: {
              profesionales: ProfesionalResolveService
            }
          },
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
  {
    path: 'baja-turno',
    component: BajaTurnoComponent,
    resolve: {
      centrosSalud: CentrosSaludResolveService
    }
  },
  {
    path: 'alta-especialidad',
    component: AltaEspecialidadComponent,
    resolve: {
      profesionales: ProfesionalResolveService
    }
  },
  {
    path: 'alta-centro-salud',
    component: AltaCentroSaludComponent,
    resolve: {
      especialidades: EspecialidadResolveService
    }
  },


  {
    path: 'admin-turno', component: AltaTurnoComponent,
    resolve: {
      centrosSalud: CentrosSaludResolveService
    }
  },

  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
