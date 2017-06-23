import {LOCALE_ID, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing.module';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {CommonModule} from '@angular/common';
import {Util} from './service/utils.service';
import {TurnoService} from './service/turno.service';
import {LoadingService} from './service/loading.service';
import {IntegrantesResolveService} from './service/resolve/integrantes-resolve.service';
import {AppAuthService} from './module/auth/auth.service';
import {LocalidadesResolveService} from './service/resolve/localidades-resolve.service';
import {CentrosSaludResolveService} from './service/resolve/centros-salud-resolve.service';
import {PersonaService} from './service/persona.service';
import {AlertService} from './service/alert.service';
import {AdminGuard} from './service/guard/admin.guard';
import {AuthGuard} from './service/guard/auth.guard';
import {MetadataService} from './service/metadata.service';
import {ApiService} from './service/api.service';
import {Store} from './service/store';
import {StoreService} from './service/store.service';
import {UIModule} from './module/ui/ui.module';
import {MetadataResolveService} from './service/resolve/metadata-resolve.service';
import {AdminService} from './service/admin.service';
import {ProfesionalResolveService} from './service/resolve/profesionales-resolve.service';

const providers = [
  {provide: LOCALE_ID, useValue: 'es-AR'},
  Store,
  StoreService,
  MetadataService,
  AuthGuard,
  AdminGuard,
  AlertService,
  PersonaService,
  ApiService,
  AppAuthService,
  CentrosSaludResolveService,
  IntegrantesResolveService,
  LocalidadesResolveService,
  MetadataResolveService,
  ProfesionalResolveService,
  AdminService,
  LoadingService,
  TurnoService,
  Util
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    RouterModule,
    UIModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent],
  providers: providers
})
export class AppModule {
}
