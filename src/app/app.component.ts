import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { PerfilPage } from '../pages/perfil/perfil';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  @ViewChild('myNav') nav: NavController

  constructor(platform: Platform, private statusBar: StatusBar, 
    private splashScreen: SplashScreen, private menuCtrl: MenuController) {
    platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#00b1f0');
      this.splashScreen.hide();
    });
  }

  aboutPage() {
    this.nav.push(AboutPage);
    this.menuCtrl.close();
  }

  ContactPage() {
    this.nav.push(ContactPage);
    this.menuCtrl.close();
  }

  PerfilPage() {
    this.nav.push(PerfilPage);
    this.menuCtrl.close();
  }
}

