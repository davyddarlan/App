import { Component } from '@angular/core';
import { NavController, NavParams , AlertController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { File } from '@ionic-native/file';

import { Ressources } from '../../classes/ressources/ressources';
import { Extra } from '../../classes/extra/extra';

import { RessourcePage } from '../ressource/ressource';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private title: string = 'App SUS';

  constructor(
    private navCtrl: NavController, 
    private network: Network,
    private ressources: Ressources,
    private params: NavParams,
    private extra: Extra,
    private file: File
  ) {}

  doRefresh(refresher) {
    this.ressources.requestHttp(refresher);
  }

  ressourcePage(url: string): void {
    this.navCtrl.push(RessourcePage, {
      folder: this.file.dataDirectory + this.extra.directoryName(url)
    });
  }

  getRessources(): object[] {
    return this.ressources.getRessources();
  }

  downloadRessource(url: string): void {
    this.ressources.downloadRessource(url);
  }
}
