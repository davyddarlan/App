import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Httpd, HttpdOptions } from '@ionic-native/httpd';
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-ressource',
  templateUrl: 'ressource.html',
})
export class RessourcePage {
  private id: string;
  private title: string;
  private url: string;
  
  constructor(private navParams: NavParams, private file: File) {
    this.id = navParams.get('id');
    this.title = navParams.get('title');
    this.url = 'http://localhost:8080/index.html';
  }
}
