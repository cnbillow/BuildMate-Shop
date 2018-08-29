import { ShoppingCartService } from './shopping-cart.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFirestore, private cartService: ShoppingCartService) { }

  async placeOrder(order) {
    const result = await this.db.collection('orders').add(order);
    this.cartService.clearCart();

    return result;
  }
}
