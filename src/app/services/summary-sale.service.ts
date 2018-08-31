import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SummarySale } from '../models/summary-sales.model';
import { TimestampService } from './timestamp.service';

@Injectable({
  providedIn: 'root'
})
export class SummarySaleService {

  private sumSaleCol: AngularFirestoreCollection<SummarySale>;
  private sumSales: Observable<SummarySale[]>;

  constructor(private db: AngularFirestore, private timestampService: TimestampService) {
    this.sumSaleCol = db.collection('summary-sale');

    this.sumSales = this.sumSaleCol.snapshotChanges().pipe(
      map(change => {
        return change.map(a => {
          const data = a.payload.doc.data() as SummarySale;
          data.id = a.payload.doc.id;

          return data;
        });
      })
    );
  }

  private async saleSummaryCheck(docId) {
    const doc = await this.db.doc(`summary-sale/${docId}`).ref.get();
    const data = doc.data() as SummarySale;

    return doc.exists ? data : null;
  }

  private getSaleSummaryId(saleDate: Date) {
    const jsDate = new Date(saleDate);
    const saleYear = (jsDate.toLocaleDateString('en', { year: 'numeric' }));
    const saleMonth = (jsDate.toLocaleDateString('en', { month: 'long' }));

    return { docId: saleYear + '-' + saleMonth, month: saleMonth };
  }

  getGivingSummary() {
    return this.sumSales;
  }

  async addOrUpdateSummary(saleDate: Date, amount: number) {
    const docId = this.getSaleSummaryId(saleDate).docId;
    const docMonth = this.getSaleSummaryId(saleDate).month;

    // verify if record exists
    const isExist = await this.saleSummaryCheck(docId);

    console.log(amount);

      return this.db.doc(`summary-sale/${docId}`)
        .set({
          month: docMonth,
          total: isExist ? isExist.total + amount : amount,
          lastUpdate: this.timestampService.getTimestamp // sets server timestamp
      }, { merge: true });

    // // create new
    // return this.db.doc(`summary-sale/${docId}`)
    //   .set({ month: docMonth, total: amount, lastUpdate: this.timestampService.getTimestamp // sets server timestamp
    // }, { merge: true });
  }

}


