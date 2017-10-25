import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  private title: string = 'Sobre';

  constructor(public navCtrl: NavController) {
  }
}
