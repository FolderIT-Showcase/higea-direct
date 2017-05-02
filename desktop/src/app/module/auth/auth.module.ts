import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './component/login/login.component';
import {RegisterComponent} from './component/register/register.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {GoogleSigninComponent} from './component/google-signin/google-signin.component';
import {FacebookSigninComponent} from './component/facebook-signin/facebook-signin.component';
import {RegisterSocialComponent} from './component/register-social/register-social.component';
import {BsDropdownModule} from 'ngx-bootstrap';
import {DatepickerModule} from 'ngx-bootstrap/datepicker';
import {StoreService} from '../core/service/store.service';
import {FacebookService} from 'ngx-facebook';
import {ReCaptchaModule} from 'angular2-recaptcha';
import {UserActiveComponent} from './component/user-activate/user.active.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    DatepickerModule.forRoot(),
    ReCaptchaModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    GoogleSigninComponent,
    FacebookSigninComponent,
    RegisterSocialComponent,
    UserActiveComponent
  ],
  providers: [
    StoreService,
    FacebookService
  ]
})
export class AuthModule {
}
