import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'unasus-player',
  templateUrl: 'unasus-player.html'
})
export class UnasusPlayerComponent implements OnInit {
  @Input() url: string;
  private urlSanitizer: any;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.urlSanitizer = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }
}
