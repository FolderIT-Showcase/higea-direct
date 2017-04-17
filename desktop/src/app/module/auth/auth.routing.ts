import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../core/component/home/home.component';
import {LoginComponent} from 'app/module/auth/login/login.component';
import {RegisterComponent} from 'app/module/auth/register/register.component';
import {AuthGuard} from '../core/guard/auth.guard';

const appRoutes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},

  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
