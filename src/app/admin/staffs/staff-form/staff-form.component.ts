import { UploadService } from './../../../services/upload.service';
import { TimestampService } from './../../../services/timestamp.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from './../../../services/alert.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { StaffService } from '../../../services/staff.service';
import { Staff } from '../../../models/staff.model';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.scss']
})
export class StaffFormComponent implements OnInit, OnDestroy {

  staff: Staff = {
    contact: {}
  };

  staffId: string;

  step = 0;

  imageUrl = '../../../../assets/avatars/avatar3.png';
  fileToUpload: FileList;
  isHovering: boolean;

  subscription: Subscription;

  constructor(private staffService: StaffService,
              private alertService: AlertService,
              private route: ActivatedRoute,
              private timestampService: TimestampService,
              private router: Router,
              private uploadService: UploadService) { }

  ngOnInit() {
    this.staffId = this.route.parent.snapshot.paramMap.get('id');

    if (this.staffId) {
      this.subscription = this.staffService.getStaff(this.staffId).subscribe(resp => {
        this.staff = resp;
        this.staff.dob = this.timestampService.timestampToDate(resp.dob);
      });
    }
  }

  ngOnDestroy(): void {
   if (this.subscription) {
     this.subscription.unsubscribe();
   }
  }

  async onSubmit() {
    const confirm = await this.alertService.confirmUpdate();
    if (confirm.value) {

      if (this.staffId) {
        await this.staffService.updateStaff(this.staffId, this.staff);

        this.alertService.afterUpdateSuccess();
        this.router.navigate(['account', 'staffs']);
        return;
      }

      // else
      const staffData = await this.staffService.addStaff(this.staff);
      const staffId = (await staffData.staff).id;
      const avatar = staffData.avatar;

      this.uploadService.pushUpload(this.fileToUpload, staffId, avatar);

      this.alertService.afterUpdateSuccess();
      this.router.navigate(['account', 'staffs']);
    }
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file;

    // if (this.fileToUpload.item(0).type !== 'image') {
    //   console.log('unsupported file type :( ');
    // }

    // show image preview
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload.item(0));
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
