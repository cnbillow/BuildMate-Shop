import { Subscription } from 'rxjs';
import { StaffService } from './../../../services/staff.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Staff } from '../../../models/staff.model';

@Component({
  selector: 'app-staffs-registry',
  templateUrl: './staffs-registry.component.html',
  styleUrls: ['./staffs-registry.component.css']
})
export class StaffsRegistryComponent implements OnInit, OnDestroy {

  // search Qry
  searchQry: string;

  staffs: Staff[] = [];
  filteredStaffs: Staff[] = [];

  showSpinner = true;
  subscription: Subscription;

  constructor(private staffService: StaffService) { }

  ngOnInit() {
    this.subscription = this.staffService.getStaffs().subscribe(resp => {
      this.showSpinner = false;
      this.staffs = this.filteredStaffs = resp;
    });
  }

  ngOnDestroy(): void {
   if (this.subscription) {
     this.subscription.unsubscribe();
   }
  }

  search(qry: string) {

    this.filteredStaffs = qry ?
    this.staffs.filter(
      p => p.names.toLowerCase().includes(qry.toLowerCase())) : this.staffs;
  }

  clearSearchField() {
    this.search('');
    this.searchQry = '';
  }

}
