import { AlertService } from './../../../services/alert.service';
import { MatSnackBar } from '@angular/material';
import { OrderService } from './../../../services/order.service';
import { CartItem } from './../../../models/cartItem.model';
import { ShoppingCartService } from './../../../services/shopping-cart.service';
import { Staff } from './../../../models/staff.model';
import { Subscription, Observable } from 'rxjs';
import { StaffService } from './../../../services/staff.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { startWith, map } from 'rxjs/operators';
import { Product } from '../../../models/product.model';
import { TimestampService } from '../../../services/timestamp.service';
import { Order } from '../../../models/order.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  hideControls = true;

  myControl = new FormControl;

  staffs: Staff[] = [];
  filteredOptions: Observable<Staff[]>;

  cart: CartItem[] = [];
  cartTotalQTY = 0;
  cartTotalPrice = 0;

  checkOutTransactionInfo = {
    staff: '',
    transactionType: '',
    amountPaid: 0,
    balance: 0
  };

  step = 0;

  staffSubscription: Subscription;
  cartSubcription: Subscription;

  constructor(private staffService: StaffService,
              private cartService: ShoppingCartService,
              private timestampService: TimestampService,
              private orderService: OrderService,
              private snackBar: MatSnackBar,
              private router: Router,
              private alertService: AlertService) { }

  async ngOnInit() {
    this.staffSubscription = this.staffService.getStaffs().subscribe(resp => {
      this.getCartItemsTotalQTY(); // loads total QTY to check-out button
      this.staffs = resp;

        this.filteredOptions = this.myControl.valueChanges
        .pipe(
        startWith<string | Product>(''),
        map(value => typeof value === 'string' ? value : value.pattern),
        map(name => name ? this._filter(name) : this.staffs.slice())
      );
    });

    const cart$ = await this.cartService.getCart();
    cart$.subscribe(result => {
      this.getCartItemsTotalQTY(); // loads total QTY to check-out button
      this.cart = result;
    });
  }

  ngOnDestroy(): void {
    if (this.staffSubscription) {
      this.staffSubscription.unsubscribe();
    }

    if (this.cartSubcription) {
      this.cartSubcription.unsubscribe();
    }
  }

  transactionOnChange(event) {
    return this.checkOutTransactionInfo.amountPaid = 0;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  async placeOrder() {

    if (!this.checkOutTransactionInfo.staff) {
      return this.openSnackBar('Select collecting staff before proceeding operation!', 'Error');
    }

    if (this.checkOutTransactionInfo.transactionType === 'Cash' &&
      (!this.checkOutTransactionInfo.amountPaid ||
      this.checkOutTransactionInfo.amountPaid < 1)) {
      return this.openSnackBar('Enter amount paid for cash transactions before proceeding operation!', 'Error');
    }

    const date = this.timestampService.getTimestamp;
    const order: Order = {
      transactionDetails: this.checkOutTransactionInfo,
      datePlaced: date,
      items: this.cart.map(i => {
        return {
          product: {
            id: i.product.id,
            pattern: i.product.pattern,
            unitPrice: i.product.unitPrice
          },
          quantity: i.quantity,
          totalPrice: i.product.unitPrice * i.quantity,
          transactionDetails: this.checkOutTransactionInfo
        };
      })
    };

    const confirm = await this.alertService.addToCart();
    if (confirm.value) {
      const result = await this.orderService.placeOrder(order);
      this.router.navigate(['account', 'order-success', result.id]);

      this.alertService.addToCartSuccess();
    }

  }

  getCartItemsTotalQTY() {
    const totalQTY = this.cartService.getCartTotalItemCount(this.cart);
    return totalQTY;
  }

  getCartItemsTotalPrice() {
    const totalPrice = this.cartService.getCartTotalPrice(this.cart);
    return totalPrice;
  }

  getOutStandingPayment() {
    const balance = this.getCartItemsTotalPrice() - this.checkOutTransactionInfo.amountPaid;
    this.checkOutTransactionInfo.balance = balance;
    return balance;
  }

  private _filter(name: string): Product[] {
    const filterValue = name.toLowerCase();

    return this.staffs.filter(option => option.names.toLowerCase().includes(filterValue));
  }

  displayFn(staffId) {

    // I want to get the full object and display the name
    if (!staffId) {
      return;
    }

    this.checkOutTransactionInfo.staff = staffId; // assign selected person id to model

    const index = this.staffs.findIndex(p => p.id === staffId);
    return this.staffs[index].names;
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
