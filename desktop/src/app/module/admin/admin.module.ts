import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {TimepickerModule} from 'ngx-bootstrap/timepicker';
import {BsDropdownModule, DatepickerModule, ModalModule, PopoverModule} from 'ngx-bootstrap';
import {AdminHomeComponent} from './component/admin-home.component';
import {Store} from '../core/service/store';
import {AdminService} from '../core/service/admin.service';
import {ProfesionalResolveService} from '../core/service/resolve/profesionales-resolve.service';
import {ApiService} from '../core/service/api.service';
import {LoadingService} from '../core/service/loading.service';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {PagerService} from '../core/service/pager.service';
import {CentrosSaludResolveService} from '../core/service/resolve/centros-salud-resolve.service';
import {EspecialidadResolveService} from '../core/service/resolve/especialidad-resolve.service';
import {SidebarComponent} from '../core/component/sidebar/sidebar.component';
import {TurnosComponent} from './component/turnos/turnos.component';
import {EspecialidadesComponent} from './component/especialidades/especialidades.component';
import {CentrosSaludComponent} from './component/centros-salud/centros-salud.component';
import {ProfesionalesComponent} from './component/profesionales/profesionales.component';
import {CoreModule} from '../core/core.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EspecialidadBusquedaComponent} from './component/especialidad-busqueda/especialidad-busqueda.component';
import {ProfesionalBusquedaComponent} from './component/profesional-busqueda/profesional-busqueda.component';
import {TurnoBusquedaComponent} from './component/turno-busqueda/turno-busqueda.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    TimepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    DatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    PopoverModule.forRoot()
  ],
  declarations: [
    AdminHomeComponent,
    SidebarComponent,
    TurnosComponent,
    EspecialidadesComponent,
    CentrosSaludComponent,
    ProfesionalesComponent,
    EspecialidadBusquedaComponent,
    ProfesionalBusquedaComponent,
    TurnoBusquedaComponent
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
