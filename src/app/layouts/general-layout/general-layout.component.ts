import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-layout',
  templateUrl: './general-layout.component.html',
  styleUrls: ['./general-layout.component.scss']
})
export class GeneralLayoutComponent implements OnInit {

  clientHeight: number;

  constructor() {
    this.clientHeight = window.innerHeight;
  }

  ngOnInit() {
  }

}
