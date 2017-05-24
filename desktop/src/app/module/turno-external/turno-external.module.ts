import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../core/core.module';
import {BsDropdownModule, ModalModule, PopoverModule, TimepickerModule} from 'ngx-bootstrap';
import {MyDatePickerModule} from 'mydatepicker';
import {AgmCoreModule} from 'angular2-google-maps/core';
import {TurnoExternalComponent} from './component/turno-external/turno-external.component';
import {NuevoTurnoExternalComponent} from './component/nuevo-turno-external/nuevo-turno-external.component';
import {ResultadoExternalComponent} from './component/resultado-external/resultado-external.component';

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
    NuevoTurnoExternalComponent,
    ResultadoExternalComponent
  ],
  exports: [
    TurnoExternalComponent,
    NuevoTurnoExternalComponent,
    ResultadoExternalComponent
  ]
})
export class TurnoExternalModule {
}
