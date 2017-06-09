import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertComponent} from './alert/alert.component';
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './navbar/navbar.component';
import {LoadingComponent} from './loading/loading.component';
import {CoreComponent} from './core/core.component';
import {ModalComponent} from './modal/modal.component';
import {ModalModule} from 'ngx-bootstrap';
import {RouterModule} from '@angular/router';
import {SelectComponent} from './select/select.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ModalModule.forRoot()
  ],
  declarations: [
    AlertComponent,
    CoreComponent,
    HomeComponent,
    LoadingComponent,
    ModalComponent,
    NavbarComponent,
    SelectComponent,
  ],
  exports: [
    AlertComponent,
    CoreComponent,
    HomeComponent,
    LoadingComponent,
    ModalComponent,
    NavbarComponent
  ]
})
export class UIModule {
}
