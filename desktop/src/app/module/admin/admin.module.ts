import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {TimepickerModule} from 'ngx-bootstrap/timepicker';
import {BsDropdownModule, DatepickerModule, ModalModule} from 'ngx-bootstrap';

import {AdminHomeComponent} from './component/admin-home.component';
import {AltaTurnoComponent} from './component/admin-turno/alta-turno.component';
import {BajaTurnoComponent} from './component/admin-turno/baja-turno.component';
import {BusquedaTurnoComponent} from './component/admin-turno/busqueda/busqueda-turno.component';
import {AltaEspecialidadComponent} from './component/admin-especialidad/alta-especialidad.component';
import {Store} from '../core/service/store';
import {AdminService} from '../core/service/admin.service';
import {ProfesionalResolveService} from '../core/service/resolve/profesionales-resolve.service';
import {ApiService} from '../core/service/api.service';
import {LoadingService} from '../core/service/loading.service';
import {BusquedaProfesionalComponent} from './component/admin-especialidad/busqueda/busqueda-profesional.component';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {PagerService} from '../core/service/pager.service';
import {AltaCentroSaludComponent} from './component/admin-centro-salud/alta-centro-salud-component';
import {BusquedaEspecialidadComponent} from './component/admin-centro-salud/busqueda/busqueda-especialidad-component';
import {CentrosSaludResolveService} from '../core/service/resolve/centros-salud-resolve.service';
import {EspecialidadResolveService} from '../core/service/resolve/especialidad-resolve.service';
import {SidebarComponent} from '../core/component/sidebar/sidebar.component';
import {TurnosComponent} from './turnos/turnos.component';
import {EspecialidadesComponent} from './especialidades/especialidades.component';
import {CentrosSaludComponent} from './centros-salud/centros-salud.component';
import {ProfesionalesComponent} from './profesionales/profesionales.component';
import {ModalComponent} from '../core/component/modal/modal.component';
import {CoreModule} from '../core/core.module';
import { PopoverModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    CoreModule,
    TimepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    DatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    PopoverModule.forRoot()
  ],

  declarations: [
    AdminHomeComponent,
    AltaTurnoComponent,
    BajaTurnoComponent,
    BusquedaTurnoComponent,
    AltaEspecialidadComponent,
    BusquedaProfesionalComponent,
    AltaCentroSaludComponent,
    BusquedaEspecialidadComponent,
    SidebarComponent,
    TurnosComponent,
    EspecialidadesComponent,
    CentrosSaludComponent,
    ProfesionalesComponent
  ],
  providers: [
    Store,
    AdminService,
    ApiService,
    ProfesionalResolveService,
    CentrosSaludResolveService,
    EspecialidadResolveService,
    LoadingService,
    PagerService
  ]

})
export class AdminModule {
}
