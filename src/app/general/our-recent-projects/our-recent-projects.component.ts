import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-our-recent-projects',
  templateUrl: './our-recent-projects.component.html',
  styleUrls: ['./our-recent-projects.component.scss']
})
export class OurRecentProjectsComponent implements OnInit {

  @Input() showBreadcrum = true;

  pageHeader = 'Our Projects';
  pageText = `Lorem ipsum dolor sit amet consectetur adipisicing elit.`;

  constructor() { }

  ngOnInit() {
  }

}
