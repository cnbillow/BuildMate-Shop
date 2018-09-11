import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AuthGuard } from '../../services/auth.guard';
import { AdminAuthGuard } from '../../services/admin-auth.guard';

@Component({
  selector: 'app-general-layout',
  templateUrl: './general-layout.component.html',
  styleUrls: ['./general-layout.component.scss']
})
export class GeneralLayoutComponent implements OnInit, OnDestroy {

  currentUrl: string;
  clientHeight: number;

  authProviderData = {};

  subscription: Subscription;
  authSubscription: Subscription;

  constructor(router: Router,
              public auth: AuthService) {
    this.subscription = router.events.subscribe((_: NavigationEnd) => this.currentUrl = _.url);
    this.clientHeight = window.innerHeight;
  }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      if (!user) { return; }
      this.authProviderData = user.providerData[0];
    });
  }

  ngOnDestroy(): void {
   if (this.subscription) {
     this.subscription.unsubscribe();
   }

   if (this.authSubscription) {
     this.authSubscription.unsubscribe();
   }
  }

  signOut() {
    this.auth.logout();
  }

}
