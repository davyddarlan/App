import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { SE_UNASUS_PLAYER_API } from './player_localstore';

@Component({
  selector: 'unasus-player',
  templateUrl: 'unasus-player.html'
})
export class UnasusPlayerComponent implements OnInit {
  @Input() url: string;
  private urlSanitizer: any;

  constructor(private sanitizer: DomSanitizer) {
    window['SE_UNASUS_PLAYER_API'] = SE_UNASUS_PLAYER_API;
  }

  ngOnInit() {
    this.urlSanitizer = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }
}
