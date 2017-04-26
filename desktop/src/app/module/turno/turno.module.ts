import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NuevoTurnoComponent} from './component/nuevo-turno/nuevo-turno.component';
import {FormsModule} from '@angular/forms';
import {DatepickerModule} from 'ngx-bootstrap/datepicker';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {ResultadoComponent} from './component/resultado/resultado.component';
import {TurnoComponent} from './turno.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {AgmCoreModule} from 'angular2-google-maps/core';
import {RouterModule} from '@angular/router';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    DatepickerModule,
    BsDropdownModule.forRoot(),
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
  ]
})
export class TurnoModule {
}
