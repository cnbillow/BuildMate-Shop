import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-general-layout',
  templateUrl: './general-layout.component.html',
  styleUrls: ['./general-layout.component.scss']
})
export class GeneralLayoutComponent implements OnInit, OnDestroy {

  currentUrl: string;
  clientHeight: number;

  subscription: Subscription;

  constructor(router: Router,
              public auth: AuthService) {
    this.subscription = router.events.subscribe((_: NavigationEnd) => this.currentUrl = _.url);
    this.clientHeight = window.innerHeight;
  }

  ngOnInit() { }

  ngOnDestroy(): void {
   if (this.subscription) {
     this.subscription.unsubscribe();
   }
  }

}
