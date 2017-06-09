import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './component/login/login.component';
import {RegisterComponent} from './component/register/register.component';
import {RegisterSocialComponent} from './component/register-social/register-social.component';
import {UserActiveComponent} from './component/user-activate/user.active.component';
import {AuthHomeComponent} from './auth-home.component';

const routes: Routes = [
  {
    path: '',
    component: AuthHomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'register-social',
        component: RegisterSocialComponent,
        loadChildren: 'app/module/auth/auth.module#AuthModule',
      },
      {
        path: 'regitrationConfirm',
        component: UserActiveComponent,
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AuthRoutingModule {
}
