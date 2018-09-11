import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Upload } from '../../models/upload.model';
import { AuthService } from '../../services/auth.service';
import { RoleService } from '../../services/role-service.service';
import { StaffAccount } from './../../models/account.model';
import { Staff } from './../../models/staff.model';
import { StaffService } from './../../services/staff.service';
import { UploadService } from './../../services/upload.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit, OnDestroy {

  user$: Observable<Staff>;

  gallery: Upload[] = [];

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

    subscription: Subscription;
    authSubscription: Subscription;
    roleSubscription: Subscription;
    uploadSubscription: Subscription;

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router,
              private auth: AuthService,
              private roleService: RoleService,
              private staffService: StaffService,
              private uploadService: UploadService) {
                this.subscription = router.events.subscribe((_: NavigationEnd) => this.currentUrl = _.url);
                this.clientHeight = window.innerHeight;
  }

  ngOnInit() {
    this.authSubscription = this.auth.user$.subscribe(state => {
      if (!state) { return; }

      // get account
      this.roleSubscription = this.roleService.getUser(state.uid).pipe(take(1)).subscribe(user => {
        console.log(user);
        this.user$ = this.staffService.getStaff(user.staff);
      });

    });

    this.uploadSubscription = this.uploadService.getAllGallery().subscribe(gallery => {
      this.gallery = gallery;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.uploadSubscription) {
      this.uploadSubscription.unsubscribe();
    }

    if (this.roleSubscription) {
      this.roleSubscription.unsubscribe();
    }

    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  getUserAvatar(avatarId: string) {
    if (!avatarId) {
      return;
    }

    const index = this.gallery.findIndex(g => g.Id === avatarId);
    return this.gallery[index].url;
  }

  signOut() {
    this.auth.logout();
  }

}
