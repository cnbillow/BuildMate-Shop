import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @Input() showControls = true;
  @Input() gallery;

  index = 0;
  infinite = true;
  direction = 'right';
  directionToggle = true;
  autoplay = true;

  constructor() { }

  ngOnInit() { }

  change($event) {
    console.log($event);
  }

  indexChanged(index) {
    console.log(index);
  }

  toggleDirection($event) {
    this.direction = this.directionToggle ? 'right' : 'left';
  }

}
