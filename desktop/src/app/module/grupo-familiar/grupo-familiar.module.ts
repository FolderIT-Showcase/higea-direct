import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NuevoIntegranteComponent} from './component/nuevo-integrante/nuevo-integrante.component';
import {FormsModule} from '@angular/forms';
import {DatepickerModule} from 'ngx-bootstrap/datepicker';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {ModificarIntegranteComponent} from './component/modificar-integrante/modificar-integrante.component';
import {GrupoFamiliarComponent} from './grupo-familiar.component';
import {ListaIntegrantesComponent} from './component/lista-integrantes/lista-integrantes.component';
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
    GrupoFamiliarComponent,
    NuevoIntegranteComponent,
    ModificarIntegranteComponent,
    ListaIntegrantesComponent
  ]
})
export class GrupoFamiliarModule {
}
