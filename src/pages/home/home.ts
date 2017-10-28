import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Network } from '@ionic-native/network';

import { Ressources } from './ressources';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private title: string = 'App SUS';

  constructor(
    private navCtrl: NavController, 
    private network: Network,
    private ressources: Ressources
  ) {}
}
