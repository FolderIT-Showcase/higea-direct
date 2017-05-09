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
import {AuthGuard} from './service/guard/auth.guard';
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
import {AdminGuard} from './service/guard/admin.guard';
import {ModalComponent} from './component/modal/modal.component';
import {BusyConfig, BusyModule} from 'angular2-busy';
import {LocalidadesResolveService} from './service/resolve/localidad-resolve.service';

const busyconfig = new BusyConfig({
  message: 'Por favor espere',
  template: `
          <div style="margin: auto; padding: auto; text-align: center; vertical-align: center">
              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
          </div>
    `,
  delay: 200,
  minDuration: 600
})

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpModule,
    RouterModule,
    BusyModule.forRoot(busyconfig),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    routing
  ],
  exports: [BrowserModule, AlertComponent, BsDropdownModule, LoadingComponent, ModalComponent],
  declarations: [
    AlertComponent,
    HomeComponent,
    NavbarComponent,
    LoadingComponent,
    CoreComponent,
    ModalComponent
  ],
  providers: [
    Store,
    PaisesResolveService,
    MetadataService,
    AuthGuard,
    AdminGuard,
    AlertService,
    PersonaService,
    ApiService,
    AppAuthService,
    CentrosSaludResolveService,
    IntegrantesResolveService,
    LoadingService,
    TurnoService,
    LocalidadesResolveService
  ]
})
export class CoreModule {
}
