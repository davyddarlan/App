import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

import { Login } from '../../classes/login/login';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private login: Login
  ) {}

  public goHome(): void {
    this.login.login();
    this.login.isLogin.subscribe((result) => {
      if (result) {
        this.navCtrl.setRoot(HomePage);
      } 
    });
  }
}
