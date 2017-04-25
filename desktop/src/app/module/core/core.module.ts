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
import {EspecialidadesResolveService} from './service/resolve/especialidades-resolve.service';
import {IntegrantesResolveService} from './service/resolve/integrantes-resolve.service';
import {ProfesionalesResolveService} from './service/resolve/profesionales-resolve.service';
import {TurnoService} from './service/turno.service';

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
    HomeComponent,
    NavbarComponent
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
    EspecialidadesResolveService,
    IntegrantesResolveService,
    ProfesionalesResolveService,
    TurnoService
  ]
})
export class CoreModule {
}
