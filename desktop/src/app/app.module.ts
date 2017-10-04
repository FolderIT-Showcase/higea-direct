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
import {LocalidadesResolveService} from './service/resolve/localidades-resolve.service';
import {PersonaService} from './service/persona.service';
import {AlertService} from './service/alert.service';
import {MetadataService} from './service/metadata.service';
import {ApiService} from './service/api.service';
import {Store} from './service/store';
import {StoreService} from './service/store.service';
import {UIModule} from './module/ui/ui.module';
import {MetadataResolveService} from './service/resolve/metadata-resolve.service';
import {AdminService} from './service/admin.service';
import {ProfesionalResolveService} from './service/resolve/profesionales-resolve.service';
import {AccessControlUtil} from './module/ui/util/access.control.util';

const providers = [
  {provide: LOCALE_ID, useValue: 'es-AR'},
  Store,
  StoreService,
  MetadataService,
  AlertService,
  PersonaService,
  ApiService,
  IntegrantesResolveService,
  LocalidadesResolveService,
  MetadataResolveService,
  ProfesionalResolveService,
  AdminService,
  LoadingService,
  TurnoService,
  Util,
  AccessControlUtil
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
