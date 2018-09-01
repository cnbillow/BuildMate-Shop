import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderRemitService {

  constructor(private db: AngularFirestore) { }

  remitOrder(orderRemit: Order, orderId: string) {
    const data = this.db.doc(`staff-order-remit/${orderId}`).set(orderRemit);
    this.updateOrderStatus(orderId);

    return data;
  }

  updateOrderStatus(orderId: string) {
    return this.db.doc(`staff-orders/${orderId}`).set({
      remitStatus: true
    }, { merge: true });
  }
}
