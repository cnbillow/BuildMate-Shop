import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Product } from '../../../models/product.model';
import { ProductCategoryService } from '../../../services/product-category.service';
import { Category } from './../../../models/category.model';
import { ProductService } from './../../../services/product.service';

@Component({
  selector: 'app-product-registry',
  templateUrl: './product-registry.component.html',
  styleUrls: ['./product-registry.component.css']
})
export class ProductRegistryComponent implements OnInit, OnDestroy {

  // search Qry
  searchQry: string;

  product: Product[] = [];
  filteredProduct: Product[] = [];

  category: Category[] = [];

  showSpinner = true;
  subscription: Subscription;

  constructor(private productService: ProductService, private categoryService: ProductCategoryService) { }

  ngOnInit() {
    this.subscription = this.categoryService.getCategories().pipe(switchMap(resp => {
      this.category = resp;
      this.showSpinner = false;
      return this.productService.getProducts();
    })).subscribe(result => {
      this.product = this.filteredProduct = result;
    });
  }

  ngOnDestroy(): void {
   if (this.subscription) {
     this.subscription.unsubscribe();
    }
  }

  getCategorDetails(categoryId: string) {
    if (!categoryId) {
      return;
    }

    const index = this.category.findIndex(c => c.id === categoryId);
    return this.category[index].name;
  }

  search(qry: string) {

    this.filteredProduct = qry ?
    this.product.filter(
      p => p.pattern.toLowerCase().includes(qry.toLowerCase())) : this.product;
  }

  clearSearchField() {
    this.search('');
    this.searchQry = '';
  }

}
