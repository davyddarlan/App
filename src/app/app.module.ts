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

import { MyApp } from './app.component';
import { ComponentsModule } from '../components/components.module';

//pages
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { PerfilPage } from '../pages/perfil/perfil';
import { RessourcePage } from '../pages/ressource/ressource';

//providers
import { Persistence } from '../classes/persistence/persistence';
import { Ressources } from '../classes/ressources/ressources';
import { Cache } from '../classes/cache/cache';
import { Transfer } from '../classes/transfer/transfer';
import { Extra } from '../classes/extra/extra';
 
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    ContactPage,
    PerfilPage,
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
    AboutPage,
    ContactPage,
    PerfilPage,
    RessourcePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    Persistence,
    Ressources,
    Cache,
    Transfer,
    FileTransfer,
    Extra,
    File,
    Zip,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
