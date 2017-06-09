import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {GrupoFamiliarComponent} from './grupo-familiar.component';
import {ListaIntegrantesComponent} from './component/lista-integrantes/lista-integrantes.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {AgmCoreModule} from 'angular2-google-maps/core';
import {MyDatePickerModule} from 'mydatepicker';
import {GrupoFamiliarRoutingModule} from './grupo-familiar.routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UIModule} from '../ui/ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UIModule,
    GrupoFamiliarRoutingModule,
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAflntypuq6NWQj75NAk_IGgc2uPpJiVqs'
    }),
    MyDatePickerModule
  ],
  declarations: [
    GrupoFamiliarComponent,
    ListaIntegrantesComponent
  ],
  exports: [
    GrupoFamiliarComponent
  ]
})
export class GrupoFamiliarModule {
}
