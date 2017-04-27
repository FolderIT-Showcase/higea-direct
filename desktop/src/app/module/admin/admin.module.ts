import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TimepickerModule} from 'ngx-bootstrap/timepicker';
import {AdminTurnoComponent} from './component/admin-turno/admin-turno.component';
import {BsDropdownModule, DatepickerModule} from 'ngx-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    TimepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    DatepickerModule.forRoot()
  ],
  declarations: [AdminTurnoComponent]
})
export class AdminModule {
}
