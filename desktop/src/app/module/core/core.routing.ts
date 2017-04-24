import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './component/home/home.component';
import {LoginComponent} from '../auth/component/login/login.component';
import {RegisterComponent} from '../auth/component/register/register.component';
import {RegisterSocialComponent} from '../auth/component/register-social/register-social.component';
import {TurnoComponent} from '../turno/turno.component';
import {UserActiveComponent} from "../auth/component/user-activate/user.active.component";

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // canActivate: [AuthGuard],
    // resolve: {      metadata: MetadataResolveService    }
  },
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {
    path: 'register',
    component: RegisterComponent,
  },
  {path: 'register-social', component: RegisterSocialComponent},
  {path: 'regitrationConfirm', component: UserActiveComponent},
  {path: 'nuevo-turno', component: TurnoComponent},

  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
