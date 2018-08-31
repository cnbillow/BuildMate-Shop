import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  // clientHeight: number;
  // footerHeight: number;
  // @ViewChild('footer') footerDiv: ElementRef;

  clientHeight: number;

  currentUrl: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  isPhablet$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Small)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {
    router.events.subscribe((_: NavigationEnd) => this.currentUrl = _.url);
    this.clientHeight = window.innerHeight;
  }

  ngOnInit() {
  }

//   ngAfterViewInit() {
//     this.footerHeight = this.footerDiv.nativeElement.offsetHeight;
//  }

}
