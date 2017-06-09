import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TurnoBusquedaAvanzadaComponent} from './component/turno-busqueda-avanzada/turno-busqueda-avanzada';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {TurnoResultadoComponent} from './component/turno-resultado/turno-resultado.component';
import {TurnoComponent} from './component/turno/turno.component';
import {AgmCoreModule} from 'angular2-google-maps/core';
import {RouterModule} from '@angular/router';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {MisTurnosComponent} from './component/mis-turnos/mis-turnos.component';
import {ModalModule, TabsModule, TimepickerModule} from 'ngx-bootstrap';
import {MyDatePickerModule} from 'mydatepicker';
import {SwitchTurnoComponent} from './component/switch-turno/switch-turno.component';
import {TurnosListaComponent} from './component/turnos-lista/turnos-lista.component';
import {TurnoBusquedaRapidaComponent} from './component/turno-busqueda-rapida/turno-busqueda-rapida.component';
import {TurnoBusquedaRapidaExternalComponent} from './component/turno-busqueda-rapida-external/turno-busqueda-rapida-external.component';
import {TurnoResultadoExternalComponent} from './component/turno-resultado-external/turno-resultado-external.component';
import {TurnoBusquedaAvanzadaExternalComponent} from './component/turno-busqueda-avanzada-external/turno-busqueda-avanzada-external.component';
import {TurnoExternalComponent} from './component/turno-external/turno-external.component';
import {TurnoRoutingModule} from './turno.routing.module';
import {TurnoHomeComponent} from './turno-home.component';
import {UIModule} from '../ui/ui.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    UIModule,
    TurnoRoutingModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    TimepickerModule.forRoot(),
    PopoverModule.forRoot(),
    MyDatePickerModule,
    ModalModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAflntypuq6NWQj75NAk_IGgc2uPpJiVqs'
    })
  ],
  declarations: [
    TurnoHomeComponent,
    TurnoComponent,
    TurnoBusquedaAvanzadaComponent,
    TurnoResultadoComponent,
    MisTurnosComponent,
    SwitchTurnoComponent,
    TurnosListaComponent,
    TurnoBusquedaRapidaComponent,
    TurnoExternalComponent,
    TurnoBusquedaAvanzadaExternalComponent,
    TurnoResultadoExternalComponent,
    TurnoBusquedaRapidaExternalComponent
  ]
})
export class TurnoModule {
}
