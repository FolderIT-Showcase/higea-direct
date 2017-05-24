import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../core/core.module';
import {BsDropdownModule, ModalModule, PopoverModule, TimepickerModule} from 'ngx-bootstrap';
import {MyDatePickerModule} from 'mydatepicker';
import {AgmCoreModule} from 'angular2-google-maps/core';
import {TurnoExternalComponent} from './component/turno-external/turno-external.component';
import {TurnoBusquedaAvanzadaExternalComponent} from './component/turno-busqueda-avanzada-external/turno-busqueda-avanzada-external.component';
import {TurnoResultadoExternalComponent} from './component/turno-resultado-external/turno-resultado-external.component';
import { TurnoBusquedaRapidaExternalComponent } from './component/turno-busqueda-rapida-external/turno-busqueda-rapida-external.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
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
    TurnoExternalComponent,
    TurnoBusquedaAvanzadaExternalComponent,
    TurnoResultadoExternalComponent,
    TurnoBusquedaRapidaExternalComponent
  ],
  exports: [
    TurnoExternalComponent,
    TurnoBusquedaAvanzadaExternalComponent,
    TurnoResultadoExternalComponent
  ]
})
export class TurnoExternalModule {
}
