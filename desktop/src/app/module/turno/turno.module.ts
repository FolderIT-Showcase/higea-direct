import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NuevoTurnoComponent} from './component/nuevo-turno/nuevo-turno.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DatepickerModule} from 'ngx-bootstrap/datepicker';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {ResultadoComponent} from './component/resultado/resultado.component';
import {TurnoComponent} from './turno.component';
import {AgmCoreModule} from 'angular2-google-maps/core';
import {RouterModule} from '@angular/router';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {ModificarTurnoComponent} from './component/modificar-turno/modificar-turno.component';
import {CoreModule} from '../core/core.module';
import {ModalModule, TimepickerModule} from 'ngx-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    DatepickerModule,
    BsDropdownModule.forRoot(),
    TimepickerModule.forRoot(),
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAflntypuq6NWQj75NAk_IGgc2uPpJiVqs'
    })
  ],
  declarations: [
    TurnoComponent,
    NuevoTurnoComponent,
    ResultadoComponent,
    ModificarTurnoComponent
  ]
})
export class TurnoModule {
}
