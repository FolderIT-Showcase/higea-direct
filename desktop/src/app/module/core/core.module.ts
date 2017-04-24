import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {routing} from './core.routing';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './component/home/home.component';
import {Store} from './service/store';
import {MetadataResolveService} from './service/metadata-resolve.service';
import {MetadataService} from './service/metadata.service';
import {AppAuthService} from '../auth/auth.service';
import {ApiService} from './service/api.service';
import {PersonaService} from './service/persona.service';
import {AlertService} from './service/alert.service';
import {AuthGuard} from './guard/auth.guard';
import {AlertComponent} from './component/alert/alert.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpModule,
    RouterModule,
    routing
  ],
  exports: [BrowserModule, AlertComponent],
  declarations: [
    AlertComponent,
    HomeComponent
  ],
  providers: [
    Store,
    MetadataResolveService,
    MetadataService,
    AuthGuard,
    AlertService,
    PersonaService,
    ApiService,
    AppAuthService
  ]
})
export class CoreModule {
}
