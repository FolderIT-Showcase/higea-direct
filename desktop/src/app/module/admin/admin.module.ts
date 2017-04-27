import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminTurnoComponent} from './admin-turno/admin-turno.component';
import {TimepickerModule} from 'ngx-bootstrap/timepicker';

@NgModule({
  imports: [
    CommonModule,
    AdminTurnoComponent,
    TimepickerModule.forRoot()
  ],
  declarations: []
})
export class AdminModule {
}
