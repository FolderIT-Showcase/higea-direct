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
import {SwitchTurnoComponent} from './component/switch-turno/switch-turno.component';
import {TurnosListaComponent} from './component/turnos-lista/turnos-lista.component';
import {TurnoBusquedaRapidaComponent} from './component/turno-busqueda-rapida/turno-busqueda-rapida.component';
import {TurnoResultadoExternalComponent} from './component/turno-resultado-external/turno-resultado-external.component';
import {TurnoBusquedaAvanzadaExternalComponent} from './component/turno-busqueda-external/turno-busqueda-external.component';
import {TurnoExternalComponent} from './component/turno-external/turno-external.component';
import {TurnoRoutingModule} from './turno.routing.module';
import {TurnoHomeComponent} from './turno-home.component';
import {UIModule} from '../ui/ui.module';
import {PreparacionComponent} from './component/preparacion/preparacion.component';
import {MyDatePickerModule} from '../my-date-picker/my-date-picker.module';

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
    PreparacionComponent
  ]
})
export class TurnoModule {
}
