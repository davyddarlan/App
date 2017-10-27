import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { HttpClient } from '@angular/common/http';

import { Ressources } from './ressources';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  private title: string = 'App SUS';
  private ressources: Ressources;

  constructor(
  private navCtrl: NavController, private network: Network, 
  private alertCtrl: AlertController, private http: HttpClient
  ) {}

  ngOnInit() {
    this.ressources = new Ressources(this.http);
  }
}
