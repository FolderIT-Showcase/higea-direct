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
import {CoreModule} from '../core/core.module';
import {ModalModule, TimepickerModule} from 'ngx-bootstrap';
import {MyDatePickerModule} from 'mydatepicker';
import {TurnoExternalModule} from '../turno-external/turno-external.module';
import {SwitchTurnoComponent} from './component/switch-turno/switch-turno.component';
import {TurnosListaComponent} from './component/turnos-lista/turnos-lista.component';
import { TurnoBusquedaRapidaComponent } from './component/turno-busqueda-rapida/turno-busqueda-rapida.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    TurnoExternalModule,
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
    TurnoComponent,
    TurnoBusquedaAvanzadaComponent,
    TurnoResultadoComponent,
    MisTurnosComponent,
    SwitchTurnoComponent,
    TurnosListaComponent,
    TurnoBusquedaRapidaComponent,
  ]
})
export class TurnoModule {
}
