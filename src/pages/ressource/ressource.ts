import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-ressource',
  templateUrl: 'ressource.html',
})
export class RessourcePage {
  private data: string;
  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.data = this.navParams.get('folder') + '/index.html';
  }
}
