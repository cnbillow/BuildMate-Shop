import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../models/product-category.model';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  private categoryCol: AngularFirestoreCollection<Category>;
  private categories: Observable<Category[]>

  constructor(private db: AngularFirestore) { 
    this.categoryCol = db.collection('categories');

    this.categories = this.categoryCol.snapshotChanges().pipe(
      map(change => {
        return change.map(a => {
          const data = a.payload.doc.data() as Category;
          data.id = a.payload.doc.id;

          return data;
        });
      })
    )
  }

  getCategories() {
    return this.categories;
  }

  addCategory(category: Category) {
    return this.categoryCol.add(category);
  }
}


