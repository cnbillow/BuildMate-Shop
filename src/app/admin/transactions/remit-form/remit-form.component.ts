import { AlertService } from './../../../services/alert.service';
import { TimestampService } from './../../../services/timestamp.service';
import { UploadService } from './../../../services/upload.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { Order } from '../../../models/order.model';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { switchMap } from 'rxjs/operators';
import { Product } from '../../../models/product.model';
import { Upload } from '../../../models/upload.model';
import { ProductService } from '../../../services/product.service';
import { OrderRemitService } from '../../../services/order-remit.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-remit-form',
  templateUrl: './remit-form.component.html',
  styleUrls: ['./remit-form.component.css']
})
export class RemitFormComponent implements OnInit, OnDestroy {

  @Input() staffOrder: Order;
  orderItemsMap = [];

  products: Product[] = [];

  remitOrderTransactionDetails = {
    staff: '',
    transactionType: '',
    amountPaid: 0,
    balance: 0
  };

  displayedColumns: string[] = ['product', 'quantity', 'total'];
  dataSource: MatTableDataSource<Order>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  showSpinner = true;
  subscription: Subscription;

  constructor(private productService: ProductService,
              private snackBar: MatSnackBar,
              private timestampService: TimestampService,
              private alertService: AlertService,
              private orderRemitService: OrderRemitService,
              private router: Router) { }

  ngOnInit() {

    this.subscription = this.productService.getProducts().subscribe(async products => {
      this.products = products;
      this.showSpinner = false;

      this.orderItemsMap = this.staffOrder.items.map(c => {
        return {
          product: c.product.pattern,
          quantity: c.quantity,
          total: c.totalPrice
        };
      });

      // initialised parameters
      this.remitOrderTransactionDetails.staff = this.staffOrder.transactionDetails.staff;
      this.remitOrderTransactionDetails.transactionType = 'Cash';

      this.dataSource = new MatTableDataSource(this.orderItemsMap);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnDestroy(): void {
   if (this.subscription) {
     this.subscription.unsubscribe();
   }
  }

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.staffOrder.items.map(t => t.totalPrice).reduce((acc, value) => acc + value, 0);
  }

  getTotalItemCount() {
    return this.orderItemsMap.length;
  }

  getProductDetails(productId: string) {
    if (!productId) {
      return;
    }

    const index = this.products.findIndex(p => p.id === productId);
    return this.products[index].pattern;
  }

  // form actions
  transactionOnChange(event) {
    return this.remitOrderTransactionDetails.amountPaid = 0;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getOutStandingPayment() {
    return this.staffOrder.transactionDetails.balance - this.remitOrderTransactionDetails.amountPaid;
  }

  async remitOrder() {
    if (!this.remitOrderTransactionDetails.staff) {
      return this.openSnackBar('Select collecting staff before proceeding operation!', 'Error');
    }

    if (this.remitOrderTransactionDetails.transactionType === 'Cash' &&
      (!this.remitOrderTransactionDetails.amountPaid ||
      this.remitOrderTransactionDetails.amountPaid < 1)) {
      return this.openSnackBar('Enter amount paid for cash transactions before proceeding operation!', 'Error');
    }

    // setting this.staffOrder parameters
    this.staffOrder.items.forEach(item => {
      item.transactionDetails = this.remitOrderTransactionDetails;
      this.staffOrder.transactionDetails = this.remitOrderTransactionDetails;
    });

    const date = this.timestampService.getTimestamp;
    const order: Order = {
      transactionDetails: this.remitOrderTransactionDetails,
      datePlaced: date,
      items: this.staffOrder.items
    };

    const confirm = await this.alertService.addToCart();
    if (confirm.value) {
      const staffId = this.staffOrder.transactionDetails.staff;

      await this.orderRemitService.remitOrder(order, this.staffOrder.id);
      this.router.navigate(['account', 'staff', staffId, 'order-remit']);

      this.alertService.addToCartSuccess();
    }

  }

}
