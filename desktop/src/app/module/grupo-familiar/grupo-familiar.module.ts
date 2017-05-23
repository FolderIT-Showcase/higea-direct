import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {GrupoFamiliarComponent} from './grupo-familiar.component';
import {ListaIntegrantesComponent} from './component/lista-integrantes/lista-integrantes.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {AgmCoreModule} from 'angular2-google-maps/core';
import {RouterModule} from '@angular/router';
import {CoreModule} from '../core/core.module';
import {MyDatePickerModule} from 'mydatepicker';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
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
  ]
})
export class GrupoFamiliarModule {
}
