import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss']
})
export class ServiceDetailsComponent implements OnInit {

  @Input() showBreadcrum = true;

  pageHeader = 'Service';
  pageText = `Lorem ipsum dolor sit amet consectetur adipisicing elit.`;

  constructor() { }

  ngOnInit() {
  }

}
