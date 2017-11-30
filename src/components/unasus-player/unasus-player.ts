import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'unasus-player',
  templateUrl: 'unasus-player.html'
})
export class UnasusPlayerComponent implements OnInit {
  @Input() url: string;
  private urlSanitizer: any;

  constructor(
    private sanitizer: DomSanitizer,
    public loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.urlSanitizer = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    this.loadingCtrl.create({
      content: 'Carregando recurso...',
      duration: 3000
    }).present();
  }
}
