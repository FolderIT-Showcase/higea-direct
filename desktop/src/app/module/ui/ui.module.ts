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
import {InfoStepComponent} from './info-step/info-step.component';
import {FooterComponent} from './footer/footer.component';
import {PublicHomeComponent} from './public-home/public-home.component';
import {SidebarComponent} from './sidebar/sidebar.component';

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
    FooterComponent,
    PublicHomeComponent,
    SidebarComponent
  ],
  exports: [
    AlertComponent,
    CoreComponent,
    HomeComponent,
    LoadingComponent,
    ModalComponent,
    NavbarComponent,
    SelectComponent,
    InfoStepComponent,
    FooterComponent,
    PublicHomeComponent,
    SidebarComponent
  ]
})
export class UIModule {
}
