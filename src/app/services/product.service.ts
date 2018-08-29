import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product, ProductStock } from '../models/product.model';
import { TimestampService } from './timestamp.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productCol: AngularFirestoreCollection<Product>;
  private products: Observable<Product[]>;

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
    );
  }

 

 
  // getGivingByPerson(personId: string) {
  //   return this.db.collection('giving', ref => ref
  //     .where('data.person', '==', personId)
  //     .orderBy('givingDate', 'asc'))
  //     .snapshotChanges().pipe(
  //     map(change => {
  //       return change.map(a => {
  //         const data = a.payload.doc.data() as Giving;
  //         data.Id = a.payload.doc.id;

  //         return data;
  //       });
  //     })
  //   );
  // }


  getProductById(productId: string) {
    return this.db.doc(`products/${productId}`).valueChanges();
  }

  getProducts() {
    return this.products;
  }

  getProduct(productId: string) {
    return this.db.doc(`products/${productId}`).valueChanges();
  }

  // verify if product item exists
  private async verifyProduct(productId) {
    const doc = await this.db.doc(`products/${productId}`).ref.get();
    const data = doc.data() as Product;

    return doc.exists ? data : null;
  }

  async updateProductQTY(productId: string, newQTY: number) {
    const isExist = await this.verifyProduct(productId);

    const timestamp = this.timestampService.getTimestamp;

    return this.db.doc(`products/${productId}`).set({
      availableQTY: isExist.availableQTY + newQTY,
      lastUpdate: timestamp
    }, { merge: true });
  }

  addProduct(product: Product) {
    const timestamp = this.timestampService.getTimestamp;

    product.availableQTY = 0;
    product.created = product.lastUpdate = timestamp;
    return this.productCol.add(product);
  }

  updateProduct(productId: string, product: Product) {
    const timestamp = this.timestampService.getTimestamp;

    product.lastUpdate = timestamp;
    return this.db.doc(`products/${productId}`).set(product, { merge: true });
  }

  deleteProduct(productId: string) {
    return this.db.doc(`products/${productId}`).delete();
  }
}


