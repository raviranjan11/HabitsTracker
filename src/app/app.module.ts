import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AddHabitPage} from '../pages/add-habit/add-habit';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PopoverPage } from '../pages/popover/popover';
import { Dialogs } from '@ionic-native/dialogs';
import { DatePicker } from '@ionic-native/date-picker';
import { DatabaseProvider } from '../providers/database/database';
import { HttpModule } from '@angular/http';
import { SQLite } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import {IonicStorageModule} from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PopoverPage,
    AddHabitPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PopoverPage,
    AddHabitPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Dialogs,
    DatePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    SQLitePorter,
    SQLite,
    Storage,
    HomePage,
    AddHabitPage
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
