import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {COMPILER_PROVIDERS} from '@angular/compiler';

if (environment.production) {
  enableProdMode();
}
platformBrowserDynamic([...COMPILER_PROVIDERS]).bootstrapModule(AppModule);
// platformBrowserDynamic().bootstrapModule(AppModule);
