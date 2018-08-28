import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from '../models/product.model';
import { TimestampService } from './timestamp.service';
import { Staff } from '../models/staff.model';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private staffCol: AngularFirestoreCollection<Staff>;
  private staffs: Observable<Staff[]>

  constructor(private db: AngularFirestore, private timestampService: TimestampService) { 
    this.staffCol = db.collection('staffs');

    this.staffs = this.staffCol.snapshotChanges().pipe(
      map(change => {
        return change.map(a => {
          const data = a.payload.doc.data() as Staff;
          data.id = a.payload.doc.id;

          return data;
        });
      })
    )
  }

  getStaffs() {
    return this.staffs;
  }

  getStaff(productId: string) {
    return this.db.doc(`staffs/${productId}`).valueChanges();
  }

  addStaff(staff: Staff) {
    const timestamp = this.timestampService.getTimestamp;

    staff.created = staff.lastUpdate = timestamp;
    return this.staffCol.add(staff);
  }

  updateProduct(productId: string, product: Product) {
    const timestamp = this.timestampService.getTimestamp;

    product.lastUpdate = timestamp;
    this.db.doc(`staffs/${productId}`).set(product, { merge: true });
  }

  deleteProduct(productId: string) {
    return this.db.doc(`staffs/${productId}`).delete();
  }
}



