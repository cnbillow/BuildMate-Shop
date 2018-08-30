import { ShoppingCartService } from './shopping-cart.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Order } from '../models/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderCol: AngularFirestoreCollection<Order>;
  orders: Observable<Order[]>;

  constructor(private db: AngularFirestore, private cartService: ShoppingCartService) {
    this.orderCol = db.collection('staff-orders');

    this.orders = this.orderCol.snapshotChanges().pipe(
      map(change => {
        return change.map(a => {
          const data = a.payload.doc.data() as Order;
          data.id = a.payload.doc.id;

          return data;

          // const source = a.payload.doc.metadata.fromCache ? 'local cache' : 'server';
          // console.log('Data came from ' + source);
        });
      })
    );
  }

  getOrders() {
    return this.orders;
  }

  getOrderByStaff(staffId: string) {
    return this.db.collection('staff-orders', ref => ref
      .where('transactionDetails.staff', '==', staffId))
      .snapshotChanges().pipe(
      map(change => {
        return change.map(a => {
          const data = a.payload.doc.data() as Order;
          data.id = a.payload.doc.id;

          return data;
        });
      })
    );
  }

  async placeOrder(order: Order) {
    const result = await this.db.collection('staff-orders').add(order);
    this.cartService.clearCart();

    return result;
  }
}

