import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.scss']
})
export class OurServicesComponent implements OnInit {

  @Input() showBreadcrum = true;

  pageHeader = 'Our Services';
  pageText = `Lorem ipsum dolor sit amet consectetur adipisicing elit.`;

  constructor() { }

  ngOnInit() {
  }

}
