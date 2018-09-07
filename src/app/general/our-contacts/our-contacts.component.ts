import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-our-contacts',
  templateUrl: './our-contacts.component.html',
  styleUrls: ['./our-contacts.component.scss']
})
export class OurContactsComponent implements OnInit {

  @Input() showBreadcrum = true;

  pageHeader = 'Contact Us';
  pageText = `Lorem ipsum dolor sit amet consectetur adipisicing elit.`;

  constructor() { }

  ngOnInit() {
  }

}
