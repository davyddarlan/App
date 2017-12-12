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
import { Media } from '@ionic-native/media';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Device } from '@ionic-native/device';

import { MyApp } from './app.component';
import { ComponentsModule } from '../components/components.module';

import { HomePage } from '../pages/home/home';
import { RessourcePage } from '../pages/ressource/ressource';
import { LoginPage } from '../pages/login/login';
import { MenuPage } from '../pages/menu/menu';

import { Persistence } from '../classes/persistence/persistence';
import { Itens } from '../classes/itens/itens';
import { Cache } from '../classes/cache/cache';
import { Transfer } from '../classes/transfer/transfer';
import { Extra } from '../classes/extra/extra';
import { Login } from '../classes/login/login';
import { MServer } from '../classes/mserver/mserver';
import { AppCommunication } from '../classes/appCommunication/appCommunication'
  
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RessourcePage,
    LoginPage,
    MenuPage
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
    RessourcePage,
    LoginPage,
    MenuPage
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
    InAppBrowser,
    Extra,
    Login,
    MServer,
    Device,
    File,
    Zip,
    Httpd,
    Media,
    AppCommunication,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
