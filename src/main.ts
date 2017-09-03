import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

declare var Office: any;

console.info("App started")

if (environment.production) {
  enableProdMode();
}

  // when Office has initalized, manually bootstrap the app
  Office.initialize = function () {
    console.debug("Office.initialize called")
    platformBrowserDynamic().bootstrapModule(AppModule);
//    angular.bootstrap(document.body, ['pixa-point']);
  };