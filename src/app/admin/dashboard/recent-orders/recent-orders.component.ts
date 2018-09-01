import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Order } from '../../../models/order.model';
import { Staff } from '../../../models/staff.model';
import { OrderService } from './../../../services/order.service';
import { StaffService } from './../../../services/staff.service';

@Component({
  selector: 'app-recent-orders',
  templateUrl: './recent-orders.component.html',
  styleUrls: ['./recent-orders.component.css']
})
export class RecentOrdersComponent implements OnInit, OnDestroy {

  orders: Order[] = [];
  orderMap = [];

  staffs: Staff[] = [];

  displayedColumns: string[] = ['date', 'staff', 'transactionType', 'paid', 'balance', 'remitStatus'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  showSpinner = true;
  subscription: Subscription;

  constructor(private orderService: OrderService,
              private staffService: StaffService) { }

  ngOnInit() {

    this.subscription = this.staffService.getStaffs().pipe(switchMap(staffs => {
      this.staffs = staffs;
      this.showSpinner = false;

      return this.orderService.getOrders();
    })).subscribe(orders => {

      this.orderMap = orders.map(c => {
        return {
          date: c.datePlaced,
          staff: c.transactionDetails.staff,
          transactionType: c.transactionDetails.transactionType,
          paid: c.transactionDetails.amountPaid,
          balance: c.transactionDetails.balance,
          remitStatus: c.remitStatus
        };
      });

      this.dataSource = new MatTableDataSource(this.orderMap);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    });
  }

  ngOnDestroy(): void {
   if (this.subscription) {
     this.subscription.unsubscribe();
   }
  }

  getStaffDetails(staffId: string) {
    if (!staffId) {
      return;
    }

    const index = this.staffs.findIndex(s => s.id === staffId);
    return this.staffs[index].names;
  }

}
