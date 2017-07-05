import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListaTurnosRoutingModule} from './lista-turnos.routing.module';
import {MisTurnosComponent} from './mis-turnos/mis-turnos.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UIModule} from '../ui/ui.module';
import {PopoverModule, TabsModule} from 'ngx-bootstrap';
import {ListaTurnosComponent} from './lista-turnos/lista-turnos.component';

@NgModule({
  imports: [
    CommonModule,
    ListaTurnosRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    UIModule,
    TabsModule.forRoot()
  ],
  declarations: [
    MisTurnosComponent,
    ListaTurnosComponent
  ],
  exports: [
    ListaTurnosComponent
  ]
})
export class ListaTurnosModule {
}
