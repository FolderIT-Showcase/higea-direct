import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {routing} from './core.routing';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './component/home/home.component';
import {Store} from './service/store';
import {PaisesResolveService} from './service/resolve/paises-resolve.service';
import {MetadataService} from './service/metadata.service';
import {AppAuthService} from '../auth/auth.service';
import {ApiService} from './service/api.service';
import {PersonaService} from './service/persona.service';
import {AlertService} from './service/alert.service';
import {AuthGuard} from './guard/auth.guard';
import {AlertComponent} from './component/alert/alert.component';
import {NavbarComponent} from './component/navbar/navbar.component';
import {CentrosSaludResolveService} from './service/resolve/centros-salud-resolve.service';
import {IntegrantesResolveService} from './service/resolve/integrantes-resolve.service';
import {TurnoService} from './service/turno.service';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {LoadingService} from './service/loading.service';
import {LoadingComponent} from './component/loading/loading.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {CoreComponent} from './core.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    routing
  ],
  exports: [BrowserModule, AlertComponent, BsDropdownModule, LoadingComponent],
  declarations: [
    AlertComponent,
    HomeComponent,
    NavbarComponent,
    LoadingComponent,
    CoreComponent
  ],
  providers: [
    Store,
    PaisesResolveService,
    MetadataService,
    AuthGuard,
    AlertService,
    PersonaService,
    ApiService,
    AppAuthService,
    CentrosSaludResolveService,
    IntegrantesResolveService,
    LoadingService,
    TurnoService
  ]
})
export class CoreModule {
}
