import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  private title: string = 'Perfil';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
}
