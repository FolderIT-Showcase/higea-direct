import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {routing} from './auth.routing';
import {RouterModule} from '@angular/router';
import {FacebookService} from 'ng2-facebook-sdk';
import {GoogleSignInComponent} from 'angular-google-signin';

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
    GoogleSignInComponent
  ],
  providers: [
    FacebookService
  ]
})
export class AuthModule {
}
