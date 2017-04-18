import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {AuthGuard} from './module/core/guard/auth.guard';
import {UserService} from './module/core/service/user.service';
import {AlertService} from './module/core/service/alert.service';
import {ApiService} from './module/core/service/api.service';
import {CoreModule} from './module/core/core.module';
import {AuthModule} from './module/auth/auth.module';
import {RouterModule} from '@angular/router';
import {AppAuthService} from './module/auth/auth.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    CoreModule,
    AuthModule
  ],
  providers: [
    AuthGuard,
    AlertService,
    UserService,
    ApiService,
    AppAuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
