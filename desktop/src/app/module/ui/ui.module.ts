import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertComponent} from './alert/alert.component';
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './navbar/navbar.component';
import {LoadingComponent} from './loading/loading.component';
import {CoreComponent} from './core/core.component';
import {ModalComponent} from './modal/modal.component';
import {BsDropdownModule, ModalModule} from 'ngx-bootstrap';
import {RouterModule} from '@angular/router';
import {SelectComponent} from './select/select.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { InfoStepComponent } from './info-step/info-step.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  declarations: [
    AlertComponent,
    CoreComponent,
    HomeComponent,
    LoadingComponent,
    ModalComponent,
    NavbarComponent,
    SelectComponent,
    InfoStepComponent,
  ],
  exports: [
    AlertComponent,
    CoreComponent,
    HomeComponent,
    LoadingComponent,
    ModalComponent,
    NavbarComponent,
    SelectComponent,
    InfoStepComponent
  ]
})
export class UIModule {
}
