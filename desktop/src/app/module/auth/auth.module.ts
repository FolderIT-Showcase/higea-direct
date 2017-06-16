import {NgModule} from '@angular/core';
import {LoginComponent} from './component/login/login.component';
import {RegisterComponent} from './component/register/register.component';
import {GoogleSigninComponent} from './component/google-signin/google-signin.component';
import {FacebookSigninComponent} from './component/facebook-signin/facebook-signin.component';
import {RegisterSocialComponent} from './component/register-social/register-social.component';
import {StoreService} from '../../service/store.service';
import {FacebookService} from 'ngx-facebook';
import {UserActiveComponent} from './component/user-activate/user.active.component';
import {AuthRoutingModule} from './auth.routing.module';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ReCaptchaModule} from 'angular2-recaptcha';
import {AuthHomeComponent} from './auth-home.component';
import {UIModule} from '../ui/ui.module';
import {RecoveryComponent} from './component/recovery/recovery.component';
import {RecoveryUserComponent} from './component/recovery-user/recovery.user.component';

@NgModule({
  imports: [
    AuthRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReCaptchaModule,
    UIModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    GoogleSigninComponent,
    FacebookSigninComponent,
    RegisterSocialComponent,
    UserActiveComponent,
    AuthHomeComponent,
    RecoveryComponent,
    RecoveryUserComponent
  ],
  providers: [
    StoreService,
    FacebookService
  ]
})
export class AuthModule {
}
