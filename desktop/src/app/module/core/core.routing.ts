import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './component/home/home.component';
import {AuthGuard} from './guard/auth.guard';
import {LoginComponent} from '../auth/component/login/login.component';
import {RegisterComponent} from '../auth/component/register/register.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},

  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
