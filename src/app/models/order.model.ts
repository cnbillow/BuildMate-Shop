import { CartItem } from './cartItem.model';
import { TimestampService } from './../services/timestamp.service';

export class Order {
    dataPlaced: any;
    items: any[];

    constructor(public staff, cart) {

        this.items = cart.map(i => {
            return {
              product: {
                id: i.product.id,
                pattern: i.product.pattern,
                unitPrice: i.product.unitPrice
              },
              quantity: i.quantity,
              totalPrice: i.product.unitPrice * i.quantity
            };
        });
    }
}
