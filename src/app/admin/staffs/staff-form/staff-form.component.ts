import { AlertService } from './../../../services/alert.service';
import { Component, OnInit } from '@angular/core';
import { StaffService } from '../../../services/staff.service';
import { Staff } from '../../../models/staff.model';

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.scss']
})
export class StaffFormComponent implements OnInit {

  staff: Staff = {
    contact: {}
  };

  step = 0;

  imageUrl = '../../../../assets/avatars/avatar3.png';
  fileToUpload: FileList;
  isHovering: boolean;

  constructor(private staffService: StaffService, 
              private alertService: AlertService) { }

  ngOnInit() {
  }

  async onSubmit() {
    const confirm = await this.alertService.confirmUpdate();
    if (confirm.value) {
      await this.staffService.addStaff(this.staff);

      this.alertService.afterUpdateSuccess();
    }
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
