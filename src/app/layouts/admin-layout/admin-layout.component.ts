import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

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

  uid: string;
  user: StaffAccount;
  staffDetails$: Observable<Staff>;

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

    authSubscription: Subscription;
    uploadSubscription: Subscription;

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router,
              private auth: AuthService,
              private roleService: RoleService,
              private staffService: StaffService,
              private uploadService: UploadService) {
                router.events.subscribe((_: NavigationEnd) => this.currentUrl = _.url);
                this.clientHeight = window.innerHeight;
  }

  ngOnInit() {
    this.authSubscription = this.auth.user$.subscribe(state => {

      if (state) {
        this.uid = state.uid;
        this.getUserAccount(this.uid);
      }

    });

    this.uploadSubscription = this.uploadService.getAllGallery().subscribe(gallery => {
      this.gallery = gallery;
    });
  }

  ngOnDestroy(): void {
    if (this.uploadSubscription) {
      this.uploadSubscription.unsubscribe();
    }

    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  private getUserAccount(uid: string) {
    this.roleService.getUser(uid).subscribe(user => {
      this.user = user;

      this.getStaff(user.staff);
    });
  }

  private getStaff(staffId: string) {
    this.staffDetails$ = this.staffService.getStaff(staffId);
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
