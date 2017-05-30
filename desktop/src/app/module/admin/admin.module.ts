import {NgModule} from '@angular/core';
import {AdminHomeComponent} from './component/admin-home.component';
import {Store} from '../../service/store';
import {AdminService} from '../../service/admin.service';
import {ProfesionalResolveService} from '../../service/resolve/profesionales-resolve.service';
import {ApiService} from '../../service/api.service';
import {LoadingService} from '../../service/loading.service';
import {PagerService} from '../../service/pager.service';
import {CentrosSaludResolveService} from '../../service/resolve/centros-salud-resolve.service';
import {EspecialidadResolveService} from '../../service/resolve/especialidad-resolve.service';
import {SidebarComponent} from '../ui/sidebar/sidebar.component';
import {TurnosComponent} from './component/turnos/turnos.component';
import {EspecialidadesComponent} from './component/especialidades/especialidades.component';
import {CentrosSaludComponent} from './component/centros-salud/centros-salud.component';
import {ProfesionalesComponent} from './component/profesionales/profesionales.component';
import {EspecialidadBusquedaComponent} from './component/especialidad-busqueda/especialidad-busqueda.component';
import {ProfesionalBusquedaComponent} from './component/profesional-busqueda/profesional-busqueda.component';
import {TurnoBusquedaComponent} from './component/turno-busqueda/turno-busqueda.component';
import {TurnoResolveService} from '../../service/resolve/turno-resolve.service';
import {TipoTurnoResolveService} from '../../service/resolve/tipo-turno-resolve.service';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from './admin.routing.module';
import {ModalModule, PaginationModule, TimepickerModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MyDatePickerModule} from 'mydatepicker';
import {UIModule} from '../ui/ui.module';

@NgModule({
  imports: [
    AdminRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UIModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    TimepickerModule.forRoot(),
    MyDatePickerModule
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
    TipoTurnoResolveService,
    LoadingService,
    PagerService,
    TurnoResolveService
  ],
})
export class AdminModule {
}
