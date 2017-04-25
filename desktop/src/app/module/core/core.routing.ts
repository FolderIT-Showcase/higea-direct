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
import {ProfesionalesResolveService} from './service/resolve/profesionales-resolve.service';
import {EspecialidadesResolveService} from './service/resolve/especialidades-resolve.service';


const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],

  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
    resolve: {
      paises: PaisesResolveService
    }
  },
  {
    path: 'register-social',
    component: RegisterSocialComponent,
    resolve: {
      paises: PaisesResolveService
    }
  },
  {path: 'regitrationConfirm', component: UserActiveComponent},
  {
    path: 'nuevo-turno',
    component: TurnoComponent,
    resolve: {
      integrantes: PaisesResolveService,
      centrosSalud: CentrosSaludResolveService,
      especialidades: EspecialidadesResolveService,
      profesionales: ProfesionalesResolveService
    }
  },
  {path: 'grupo-familiar', component: GrupoFamiliarComponent},

  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
