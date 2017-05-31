import {LOCALE_ID, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing.module';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {CommonModule} from '@angular/common';
import {UtilsService} from 'app/service/utils.service';
import {TurnoService} from './service/turno.service';
import {LoadingService} from './service/loading.service';
import {IntegrantesResolveService} from 'app/service/resolve/integrantes-resolve.service';
import {AppAuthService} from 'app/module/auth/auth.service';
import {LocalidadesResolveService} from './service/resolve/localidades-resolve.service';
import {CentrosSaludResolveService} from 'app/service/resolve/centros-salud-resolve.service';
import {PersonaService} from 'app/service/persona.service';
import {AlertService} from 'app/service/alert.service';
import {AdminGuard} from 'app/service/guard/admin.guard';
import {AuthGuard} from 'app/service/guard/auth.guard';
import {MetadataService} from 'app/service/metadata.service';
import {ApiService} from './service/api.service';
import {Store} from 'app/service/store';
import {StoreService} from './service/store.service';
import {UIModule} from './module/ui/ui.module';
import {EspecialidadResolveService} from './service/resolve/especialidad-resolve.service';
import {AdminService} from './service/admin.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    RouterModule,
    UIModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
  providers: [
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
    EspecialidadResolveService,
    AdminService,
    LoadingService,
    TurnoService,
    UtilsService
  ]
})
export class AppModule {
}
