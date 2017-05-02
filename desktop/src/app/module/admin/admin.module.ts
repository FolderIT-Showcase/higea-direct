import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {TimepickerModule} from 'ngx-bootstrap/timepicker';
import {BsDropdownModule, DatepickerModule} from 'ngx-bootstrap';
import {AdminHomeComponent} from './component/admin-home.component';
import {AltaTurnoComponent} from './component/admin-turno/alta-turno.component';
import {BajaTurnoComponent} from './component/admin-turno/baja-turno.component';
import {BusquedaTurnoComponent} from './component/admin-turno/busqueda/busqueda-turno.component';
import {ModalModule} from 'ngx-bootstrap/index';


@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    TimepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    DatepickerModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [AdminHomeComponent, AltaTurnoComponent, BajaTurnoComponent, BusquedaTurnoComponent]
})
export class AdminModule {
}
