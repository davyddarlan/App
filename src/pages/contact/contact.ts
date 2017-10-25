import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  private title: string = 'Contato';

  constructor(public navCtrl: NavController) {
  }
}
