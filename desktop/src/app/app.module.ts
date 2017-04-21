import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {CoreModule} from './module/core/core.module';
import {AuthModule} from './module/auth/auth.module';
import {RouterModule} from '@angular/router';
import {TurnoModule} from './module/turno/turno.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    CoreModule,
    AuthModule,
    TurnoModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
