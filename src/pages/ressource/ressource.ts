import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Httpd, HttpdOptions } from '@ionic-native/httpd';
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-ressource',
  templateUrl: 'ressource.html',
})
export class RessourcePage {
  private data: string;
  
  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams
  ) {
    this.data = '';
  }
}
