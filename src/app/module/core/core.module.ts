import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertComponent} from './component/alert/alert.component';
import {routing} from './core.routing';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './component/home/home.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpModule,
    RouterModule,
    routing
  ],
  declarations: [
    AlertComponent,
    HomeComponent
  ]
})
export class CoreModule {
}
