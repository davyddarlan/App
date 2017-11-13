import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Httpd, HttpdOptions } from '@ionic-native/httpd';
import { File } from '@ionic-native/file';

import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  /*private options: HttpdOptions = {
    www_root: this.file.externalApplicationStorageDirectory.replace('file://', ''),
    localhost_only: false,
    port: 8080
  };*/

  constructor(
    platform: Platform, 
    private statusBar: StatusBar, 
    private splashScreen: SplashScreen, 
    private httpd: Httpd,
    private file: File
  ) {
    platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#00b1f0');
      this.splashScreen.hide();
    });

    //this.httpd.startServer(this.options).subscribe((data) => {});
  }
}

