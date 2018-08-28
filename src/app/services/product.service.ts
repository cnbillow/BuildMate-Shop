import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Category } from '../models/category.model';
import { TimestampService } from './timestamp.service';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productCol: AngularFirestoreCollection<Product>;
  private products: Observable<Product[]>

  constructor(private db: AngularFirestore, private timestampService: TimestampService) { 
    this.productCol = db.collection('products');

    this.products = this.productCol.snapshotChanges().pipe(
      map(change => {
        return change.map(a => {
          const data = a.payload.doc.data() as Product;
          data.id = a.payload.doc.id;

          return data;
        });
      })
    )
  }

  getProducts() {
    return this.products;
  }

  addProducts(product: Product) {
    const timestamp = this.timestampService.getTimestamp;

    product.created = product.lastUpdate = timestamp;
    return this.productCol.add(product);
  }
}


