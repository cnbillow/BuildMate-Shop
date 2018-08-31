import { TimestampService } from './timestamp.service';
import { ShoppingCartService } from './shopping-cart.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Order } from '../models/order.model';
import { Observable } from 'rxjs';
import { SummarySaleService } from './summary-sale.service';
import { SummaryStaffOrdersService } from './summary-staff-orders.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderCol: AngularFirestoreCollection<Order>;
  orders: Observable<Order[]>;

  constructor(private db: AngularFirestore,
            private cartService: ShoppingCartService,
            private saleSummaryService: SummarySaleService,
            private timestampService: TimestampService,
            private orderSummaryService: SummaryStaffOrdersService) {
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

  private async saleSummaryCheck(docId) {
    const doc = await this.db.doc(`staff-orders/${docId}`).ref.get();
    const data = doc.data() as Order;

    return doc.exists ? data : null;
  }

  async placeOrder(order: Order) {
    const result = await this.db.collection('staff-orders').add(order);
    this.cartService.clearCart();

    const isExist = await this.saleSummaryCheck(result.id);
    if (isExist) {
      // update general summaries
      this.updateSaleSummary(isExist);
      this.updateOrderSummary(isExist);
    }

    return result;
  }

  private updateSaleSummary(order: Order) {
    const totalAmount = order.transactionDetails.amountPaid + order.transactionDetails.balance;
    const datePlaced = this.timestampService.timestampToDate(order.datePlaced);

    this.saleSummaryService.addOrUpdateSummary(datePlaced, totalAmount);
  }

  private updateOrderSummary(order: Order) {
    const datePlaced = this.timestampService.timestampToDate(order.datePlaced);

    let totalQty = 0;
    order.items.forEach(item => {
      totalQty += item.quantity;
    });

    // console.log(totalQty);
    this.orderSummaryService.addOrUpdateSummary(datePlaced, totalQty);
  }
}

