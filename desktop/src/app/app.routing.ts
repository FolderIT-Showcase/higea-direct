import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './module/core/component/home/home.component';
import {LoginComponent} from './module/auth/component/login/login.component';
import {RegisterComponent} from './module/auth/component/register/register.component';
import {AuthGuard} from './module/core/guard/auth.guard';

const appRoutes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},

  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
