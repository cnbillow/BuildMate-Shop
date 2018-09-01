import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Staff } from '../../../models/staff.model';
import { Upload } from '../../../models/upload.model';
import { AlertService } from '../../../services/alert.service';
import { UploadService } from '../../../services/upload.service';
import { StaffService } from './../../../services/staff.service';

@Component({
  selector: 'app-staff-profile',
  templateUrl: './staff-profile.component.html',
  styleUrls: ['./staff-profile.component.scss']
})
export class StaffProfileComponent implements OnInit, OnDestroy {

  staffId: string;

  staff: Staff = {
    contact: {}
  };

  galleryFiles: Upload[] = [];

  parentUrl: string;
  routeToDisplay = 'overview';

  navLinks = [];

  subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private staffService: StaffService,
              private alertService: AlertService,
              private router: Router,
              private uploadService: UploadService) { }

  ngOnInit() {
    this.staffId = this.route.snapshot.paramMap.get('id');
    this.parentUrl = `account/staff/${this.staffId}`;

    this.subscription = this.uploadService.getAllGallery().pipe(switchMap(resp => {
      this.galleryFiles = resp;

      return this.staffService.getStaff(this.staffId);
    })).subscribe(result => {
      this.staff = result;
    });

    // this.subscription = this.staffService.getStaff(this.staffId).subscribe(resp => {
    //   this.staff = resp;
    // });

    this.pushNavLinks();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getAvatarDetails() {
    const avatarId = this.staff.avatar;
    if (!avatarId) {
      return;
    }

    const index = this.galleryFiles.findIndex(g => g.Id === avatarId);
    return this.galleryFiles[index].url;
  }

  async deleteStaff() {
    const confirm = await this.alertService.confirmDelete();
    if (confirm.value) {
      await this.staffService.deleteStaff(this.staffId);

      this.alertService.afterDeleteSuccess();
      this.router.navigate(['account', 'staffs']);
    }
  }

  onLinkClick(event: MatTabChangeEvent) {
    const tabTitle = event.tab.textLabel;
    const routerLink = this.navLinks.find(n => n.label === tabTitle ).path;

    this.router.navigate([this.parentUrl, routerLink]);
  }

  navigate(routeToDisplay: string) {
    this.routeToDisplay = routeToDisplay;

    this.pushNavLinks();
  }

  pushNavLinks() {
    if (this.routeToDisplay === 'overview') {
      // else navigate to the first link and push to array
      this.router.navigate([this.parentUrl, 'transaction-log']);
      this.navLinks = [];
      return this.navLinks.push(
        { path: 'transaction-log', label: 'Transaction Log', icon: 'assessment' }
      );
    }

    // else navigate to the first link and push to array
    this.router.navigate([this.parentUrl, 'staff-update']);
    this.navLinks = [];
    return this.navLinks.push(
      { path: 'staff-update', label: 'Staff Update', icon: 'update' },
      { path: 'order-remit', label: 'Order Remit', icon: 'transit_enterexit' },
    );
  }


}
