import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { OrderService } from './../../../services/order.service';

@Component({
  selector: 'app-staff-transaction-log',
  templateUrl: './staff-transaction-log.component.html',
  styleUrls: ['./staff-transaction-log.component.scss']
})
export class StaffTransactionLogComponent implements OnInit, OnDestroy {

  orderMap = [];

  displayedColumns: string[] = ['date', 'transactionType', 'paid', 'balance'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  showSpinner = true;
  orderSubcription: Subscription;

  constructor(private orderService: OrderService,
              private route: ActivatedRoute) { }

  async ngOnInit() {
    const staffId = this.route.parent.snapshot.paramMap.get('id');

    const order = this.orderService.getOrderByStaff(staffId);
    this.orderSubcription = order.subscribe(resp => {
      this.showSpinner = false;

      this.orderMap = resp.map(c => {
        return {
          date: c.datePlaced,
          transactionType: c.transactionDetails.transactionType,
          paid: c.transactionDetails.amountPaid,
          balance: c.transactionDetails.balance
        };
      });

      this.dataSource = new MatTableDataSource(this.orderMap);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    });

  }

  ngOnDestroy(): void {
    if (this.orderSubcription) {
      this.orderSubcription.unsubscribe();
    }
  }

  /** Gets the total cost of all transactions. */
  getPaidTotalCost() {
    return this.orderMap.map(t => t.paid).reduce((acc, value) => acc + value, 0);
  }

  /** Gets the total cost of all transactions. */
  getBalanceTotalCost() {
    return this.orderMap.map(t => t.balance).reduce((acc, value) => acc + value, 0);
  }

}
