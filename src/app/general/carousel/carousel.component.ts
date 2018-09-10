import { UploadService } from './../../services/upload.service';
import { Component, OnInit, Input } from '@angular/core';
import { Upload } from '../../models/upload.model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @Input() showControls = true;
  @Input() gallery = [];

  index = 0;
  infinite = true;
  direction = 'right';
  directionToggle = true;
  autoplay = true;
  avatars = [
    { url: '../../../assets/carousel/carousel1.jpg', title: 'The first slide' },
    { url: '../../../assets/carousel/carousel2.jpg', title: 'The second slide' },
    { url: '../../../assets/carousel/carousel3.jpg', title: 'The third slide' },
    { url: '../../../assets/carousel/carousel4.jpg', title: 'The fourth slide' },
    { url: '../../../assets/carousel/carousel5.jpg', title: 'The fifth slide' },
    { url: '../../../assets/carousel/carousel6.jpg', title: 'The sixth slide' },
    { url: '../../../assets/carousel/carousel7.jpg', title: 'The seventh slide' },
    { url: '../../../assets/carousel/carousel8.jpg', title: 'The eight slide' },
    { url: '../../../assets/carousel/carousel9.jpg', title: 'The nineth slide' }
  ];

  constructor() { }

  ngOnInit() {
    console.log(this.gallery);
  }

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
