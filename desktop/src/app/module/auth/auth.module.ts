import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './component/login/login.component';
import {RegisterComponent} from './component/register/register.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {routing} from './auth.routing';
import {RouterModule} from '@angular/router';
import {FacebookService} from 'ng2-facebook-sdk';
import {GoogleSignInComponent} from 'angular-google-signin';
import {GoogleSigninComponent} from './component/google-signin/google-signin.component';
import {FacebookSigninComponent} from './component/facebook-signin/facebook-signin.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    routing
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    GoogleSignInComponent,
    GoogleSigninComponent,
    FacebookSigninComponent
  ],
  providers: [
    FacebookService
  ]
})
export class AuthModule {
}
