import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './component/login/login.component';
import {RegisterComponent} from './component/register/register.component';
import {RegisterSocialComponent} from './component/register-social/register-social.component';
import {UserActiveComponent} from './component/user-activate/user.active.component';
import {AuthHomeComponent} from './auth-home.component';
import {RecoveryComponent} from './component/recovery/recovery.component';
import {RecoveryUserComponent} from './component/recovery-user/recovery.user.component';

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
      },
      {
        path: 'regitrationConfirm',
        component: UserActiveComponent,
      },
      {
        path: 'recovery',
        component: RecoveryComponent,
      },
      {
        path: 'recoveryUser',
        component: RecoveryUserComponent,
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
