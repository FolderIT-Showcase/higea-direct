import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NuevoTurnoComponent} from "./component/nuevo-turno/nuevo-turno.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PopoverModule} from "ngx-bootstrap/popover";
import {ResultadoComponent} from "./component/resultado/resultado.component";
import {TurnoComponent} from "./turno.component";
import {AgmCoreModule} from "angular2-google-maps/core";
import {RouterModule} from "@angular/router";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {ModificarTurnoComponent} from "./component/modificar-turno/modificar-turno.component";
import {CoreModule} from "../core/core.module";
import {ModalModule, TimepickerModule} from "ngx-bootstrap";
import {MyDatePickerModule} from "mydatepicker";
import {TurnoExternalComponent} from "./component/external-license/turno-external.component";
import {NuevoTurnoExternalComponent} from "./component/external-license/nuevo-turno/nuevo-turno-external.component";
import {ResultadoExternalComponent} from "./component/external-license/resultado/resultado-external.component";
import {SwitchTurnoComponent} from "./component/switch-turno/switch-turno.component";


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    BsDropdownModule.forRoot(),
    TimepickerModule.forRoot(),
    PopoverModule.forRoot(),
    MyDatePickerModule,
    ModalModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAflntypuq6NWQj75NAk_IGgc2uPpJiVqs'
    })
  ],
  declarations: [
    TurnoComponent,
    NuevoTurnoComponent,
    ResultadoComponent,
    ModificarTurnoComponent,
    // turnos external
    TurnoExternalComponent,
    NuevoTurnoExternalComponent,
    ResultadoExternalComponent,
    SwitchTurnoComponent
  ]
})
export class TurnoModule {
}
