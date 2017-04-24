import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NuevoTurnoComponent} from './component/nuevo-turno/nuevo-turno.component';
import {FormsModule} from '@angular/forms';
import {DatepickerModule} from 'ngx-bootstrap/datepicker';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {BusquedaComponent} from './component/busqueda/busqueda.component';
import {TurnoComponent} from './turno.component';
import {ListaComponent} from './component/lista/lista.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {AgmCoreModule} from 'angular2-google-maps/core';
import {Router, RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    DatepickerModule,
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAflntypuq6NWQj75NAk_IGgc2uPpJiVqs'
    })
  ],
  declarations: [
    TurnoComponent,
    NuevoTurnoComponent,
    BusquedaComponent,
    ListaComponent
  ]
})
export class TurnoModule {
}
