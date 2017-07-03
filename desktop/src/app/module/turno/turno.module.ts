import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {RouterModule} from '@angular/router';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {ModalModule, TabsModule, TimepickerModule} from 'ngx-bootstrap';
import {TurnosListaComponent} from './turnos-lista/turnos-lista.component';
import {TurnoResultadoExternalComponent} from './turno-resultado-external/turno-resultado-external.component';
import {TurnoBusquedaAvanzadaExternalComponent} from './turno-busqueda-external/turno-busqueda-external.component';
import {TurnoExternalComponent} from './turno-external/turno-external.component';
import {TurnoRoutingModule} from './turno.routing.module';
import {TurnoHomeComponent} from './turno-home.component';
import {UIModule} from '../ui/ui.module';
import {MyDatePickerModule} from '../datepicker/datepicker.module';

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
  ],
  declarations: [
    TurnoHomeComponent,
    TurnosListaComponent,
    TurnoExternalComponent,
    TurnoBusquedaAvanzadaExternalComponent,
    TurnoResultadoExternalComponent
  ]
})
export class TurnoModule {
}
