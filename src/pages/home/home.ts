import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Network } from '@ionic-native/network';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private title: string = 'Saúde da Pessoa Idosa';

  constructor(private navCtrl: NavController, 
  private network: Network, private alertCtrl: AlertController) {
  }

  download() {
    if (this.network.type === 'none') {
      this.alertCtrl.create({
        title: 'Download falhou',
        subTitle: 'Verifique se você está conenctado a alguma rede com internet',
        buttons: ['ok']
      }).present();
    } else {
      this.alertCtrl.create({
        title: 'Recurso baixado',
        subTitle: 'O seu recurso foi baixado com sucesso',
        buttons: ['ok']
      }).present();
    }
  }
}
