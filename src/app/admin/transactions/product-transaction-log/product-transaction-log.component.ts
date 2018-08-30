import { switchMap } from 'rxjs/operators';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { OrderService } from '../../../services/order.service';
import { Order } from '../../../models/order.model';
import { StaffService } from '../../../services/staff.service';
import { Staff } from '../../../models/staff.model';

@Component({
  selector: 'app-product-transaction-log',
  templateUrl: './product-transaction-log.component.html',
  styleUrls: ['./product-transaction-log.component.scss']
})
export class ProductTransactionLogComponent implements OnInit, OnDestroy {

  staffs: Staff[] = [];

  productOrders = [];
  orderMap = [];

  displayedColumns: string[] = ['staff', 'type', 'price', 'quantity'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  showSpinner = true;
  orderSubcription: Subscription;
  staffSubscription: Subscription;

  constructor(private orderService: OrderService,
              private route: ActivatedRoute,
              private staffService: StaffService) { }

  ngOnInit() {

    const productId = this.route.parent.snapshot.paramMap.get('id');

    this.staffSubscription = this.staffService.getStaffs().pipe(switchMap(resp => {
      this.staffs = resp;
      this.showSpinner = false;

      return this.orderService.getOrders();
    })).subscribe(result => {

      // get all orders with this product id
      const orders = [];
      result.forEach(orderItem => {

        orderItem.items.forEach(item => {
          if (item.product.id === productId) {
            orders.push(item);
          }
        });

      });
      this.productOrders = orders;

      this.orderMap = this.productOrders.map(c => {
        return {
          staff: c.transactionDetails.staff,
          transactionType: c.transactionDetails.transactionType,
          unitPrice: c.product.unitPrice,
          quantity: c.quantity
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

    if (this.staffSubscription) {
      this.staffSubscription.unsubscribe();
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
