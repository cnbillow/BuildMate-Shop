import { StaffService } from './../../../services/staff.service';
import { Component, OnInit } from '@angular/core';
import { Staff } from '../../../models/staff.model';

@Component({
  selector: 'app-staffs-registry',
  templateUrl: './staffs-registry.component.html',
  styleUrls: ['./staffs-registry.component.css']
})
export class StaffsRegistryComponent implements OnInit {

  staffs: Staff[] = [];
  filteredStaffs: Staff[] = [];

  constructor(private staffService: StaffService) { }

  ngOnInit() {
    this.staffService.getStaffs().subscribe(resp => {
      this.staffs = this.filteredStaffs = resp;
      console.log(resp);
    });
  }

}
