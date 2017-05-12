import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {CoreModule} from './module/core/core.module';
import {AuthModule} from './module/auth/auth.module';
import {RouterModule} from '@angular/router';
import {TurnoModule} from './module/turno/turno.module';
import {GrupoFamiliarModule} from './module/grupo-familiar/grupo-familiar.module';
import {AlertComponent} from './module/core/component/alert/alert.component';
import {AdminModule} from './module/admin/admin.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    CoreModule,
    AuthModule,
    TurnoModule,
    GrupoFamiliarModule,
    AdminModule
  ],
  bootstrap: [AppComponent],
  providers: [AlertComponent, {provide: LOCALE_ID, useValue: 'es-AR'}]
})
export class AppModule {
}
