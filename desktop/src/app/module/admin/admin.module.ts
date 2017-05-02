import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {TimepickerModule} from 'ngx-bootstrap/timepicker';
import {BsDropdownModule, DatepickerModule} from 'ngx-bootstrap';

import {AdminHomeComponent} from "./component/admin-home.component";
import {AltaTurnoComponent} from "./component/admin-turno/alta-turno.component";
import {BajaTurnoComponent} from "./component/admin-turno/baja-turno.component";
import {AlertService} from "../core/service/alert.service";
import {BusquedaTurnoComponent} from "./component/admin-turno/busqueda/busqueda-turno.component";
import {ModalModule} from "ngx-bootstrap/index";
import {AltaEspecialidadComponent} from "./component/admin-especialidad/alta-especialidad.component";
import {Store} from "../core/service/store";
import {AdminService} from "../core/service/admin.service";
import {ProfesionalResolveService} from "../core/service/resolve/profesionales-resolve.service";
import {ApiService} from "../core/service/api.service";
import {LoadingService} from "../core/service/loading.service";
import {BusquedaProfesionalComponent} from "./component/admin-especialidad/busqueda/busqueda-profesional.component";
import { PaginationModule } from 'ngx-bootstrap/pagination';
import {PagerService} from "../core/service/pager.service";



@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    TimepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    DatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot()
  ],

  declarations:[
    AdminHomeComponent,
    AltaTurnoComponent,
    BajaTurnoComponent,
    BusquedaTurnoComponent,
    AltaEspecialidadComponent,
    BusquedaProfesionalComponent
  ],
  providers: [
    Store,
    AdminService,
    ApiService,
    ProfesionalResolveService,
    LoadingService,
    PagerService

  ]

})
export class AdminModule {
}
