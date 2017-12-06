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
  private options: HttpdOptions = {
    www_root: this.file.externalApplicationStorageDirectory.replace('file://', ''),
    localhost_only: true
  };
  private server: any;
  
  constructor(
    private navParams: NavParams, 
    private file: File,
    private httpd: Httpd
  ){
    this.id = navParams.get('id');
    this.title = navParams.get('title');
    this.url = 'http://localhost:8888/' + this.id + '/index.html';
  }

  ngOnInit() {
    this.server = this.httpd.startServer(this.options).subscribe();
  }

  ngOnDestroy() {
    this.server.unsubscribe();
  }
}
