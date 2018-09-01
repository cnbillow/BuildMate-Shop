import { OrderService } from './../../../services/order.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../../models/order.model';

@Component({
  selector: 'app-staff-order-remit',
  templateUrl: './staff-order-remit.component.html',
  styleUrls: ['./staff-order-remit.component.css']
})
export class StaffOrderRemitComponent implements OnInit, OnDestroy {

  staffOrder: Order;

  orderMap = [];
  componentToShow = 'order-remit-table';

  checkOutTransactionInfo = {
    staff: '',
    transactionType: '',
    amountPaid: 0,
    balance: 0
  };

  displayedColumns: string[] = ['date', 'transactionType', 'paid', 'balance', 'action'];
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

      const balanceRecords: Order[] = [];
      resp.forEach(item => {
        if (item.transactionDetails.balance !== 0 && !item.remitStatus) {
          balanceRecords.push(item);
        }
      });

      this.orderMap = balanceRecords.map(o => {
        return {
          date: o.datePlaced,
          transactionType: o.transactionDetails.transactionType,
          paid: o.transactionDetails.amountPaid,
          balance: o.transactionDetails.balance,
          orderRecord: o
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

  transactionOnChange(event) {
    return this.checkOutTransactionInfo.amountPaid = 0;
  }

  showRemitForm(order: Order) {
    this.staffOrder = order;
    this.componentToShow = 'remit-form';
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
