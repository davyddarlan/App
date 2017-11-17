import { Component, ElementRef, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'unasus-progress',
  templateUrl: 'unasus-progress.html'
})
export class UnasusProgressComponent implements OnChanges {
  @Input() private progress: number;

  constructor(
    private ref: ElementRef
  ) {}

  ngOnChanges(state: SimpleChanges) {
    let ref = this.ref.nativeElement.getElementsByClassName('progress-load')[0];
    ref.style.height = state.progress.currentValue + '%';
  }
 }
