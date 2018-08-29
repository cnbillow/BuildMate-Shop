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

  checkOutStaffId;

  step = 0;

  staffSubscription: Subscription;
  cartSubcription: Subscription;

  constructor(private staffService: StaffService,
              private cartService: ShoppingCartService,
              private timestampService: TimestampService,
              private orderService: OrderService,
              private snackBar: MatSnackBar,
              private router: Router) { }

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

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  async placeOrder() {

    if (!this.checkOutStaffId) {
      return this.openSnackBar('Select collecting staff proceeding operation', 'Error');
    }

    const x = new Order(this.checkOutStaffId, this.cart);

    const date = this.timestampService.getTimestamp;
    const order = {
      staff: this.checkOutStaffId,
      datePlace: date,
      items: this.cart.map(i => {
        return {
          product: {
            id: i.product.id,
            pattern: i.product.pattern,
            unitPrice: i.product.unitPrice
          },
          quantity: i.quantity,
          totalPrice: i.product.unitPrice * i.quantity
        };
      })
    };

    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['account', 'order-success', result.id]);
  }

  getCartItemsTotalQTY() {
    const total = this.cartService.getCartTotalItemCount(this.cart);
    this.cartTotalQTY = total;
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

    this.checkOutStaffId = staffId; // assign selected person id to model

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
