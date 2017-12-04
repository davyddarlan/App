import { Component } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';
import { Persistence } from '../../classes/persistence/persistence';
import { Login } from '../../classes/login/login';

import { LoginPage } from '../login/login';
 
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  constructor(
    private viewCtrl: ViewController,
    private persistence: Persistence,
    private login: Login,
    private navCtrl: NavController
  ) {}

  public close(): void {
    this.viewCtrl.dismiss();
  }

  public logout(): void {
    this.login.logout();
    this.navCtrl.push(LoginPage);
  }
}
