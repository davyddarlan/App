import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Network } from '@ionic-native/network';
import { HttpClientModule } from '@angular/common/http';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Zip } from '@ionic-native/zip';
import { Httpd } from '@ionic-native/httpd';

import { MyApp } from './app.component';
import { ComponentsModule } from '../components/components.module';

import { HomePage } from '../pages/home/home';
import { RessourcePage } from '../pages/ressource/ressource';

import { Persistence } from '../classes/persistence/persistence';
import { Itens } from '../classes/itens/itens';
import { Cache } from '../classes/cache/cache';
import { Transfer } from '../classes/transfer/transfer';
import { Extra } from '../classes/extra/extra';
 
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RessourcePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ComponentsModule,
    HttpClientModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RessourcePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    Persistence,
    Itens,
    Cache,
    Transfer,
    FileTransfer,
    Extra,
    File,
    Zip,
    Httpd,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
