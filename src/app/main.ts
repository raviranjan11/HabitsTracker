import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import { NgModule } from "@angular/core";
import { MyApp } from "../app/app.component";
import { DatabaseProvider } from "../providers/database/database";


@NgModule({
    declarations: [MyApp],
    bootstrap: [MyApp],
    imports: [],
    providers: [DatabaseProvider]
})
class AppComponentModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
