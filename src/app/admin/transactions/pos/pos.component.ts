import { PosCartComponent } from './../pos-cart/pos-cart.component';
import { MatDialog } from '@angular/material';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Product } from '../../../models/product.model';
import { ProductCategoryService } from '../../../services/product-category.service';
import { Category } from './../../../models/category.model';
import { ProductService } from './../../../services/product.service';
import { ShoppingCartService } from '../../../services/shopping-cart.service';
import { CartItem } from '../../../models/cartItem.model';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})
export class PosComponent implements OnInit, OnDestroy {

  // search Qry
  searchQry: string;

  cart: CartItem[] = [];
  cartTotalQTY = 0;

  product: Product[] = [];
  filteredProduct: Product[] = [];

  category: Category[] = [];

  subscription: Subscription;
  cartSubscription: Subscription;

  constructor(private productService: ProductService,
              private categoryService: ProductCategoryService,
              private dialog: MatDialog,
              private cartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cartSubscription = (await this.cartService.getCart()).pipe(switchMap(resp => {
      this.cart = resp;

      return this.categoryService.getCategories();
    }), switchMap(result => {
      this.category = result;

      return this.productService.getProducts();
    })).subscribe(result1 => {
      this.product = this.filteredProduct = result1;
    });

    this.getCartItemsTotalQTY(); // loads total QTY to check-out button
  }

  ngOnDestroy(): void {
   if (this.subscription) {
     this.subscription.unsubscribe();
    }

   if (this.cartSubscription) {
     this.cartSubscription.unsubscribe();
    }
  }

  addToCart(product: Product) {

    this.dialog.open(PosCartComponent, {
      data: {
        product: product,
        category: this.category,
      }
    });
  }

  getCartItemDetails(productId: string) {
    if (!productId) {
      return 0;
    }

    if (this.cart.length < 1) { return 0; }

    const cartId = localStorage.getItem('cartId');
    if (!cartId) { return; }

    const index = this.cart.findIndex(p => p.product.id === productId);
    return index > -1 ? this.cart[index].quantity : 0;
  }

  getCartItemsTotalQTY() {

    this.cart.forEach(item => {
      this.cartTotalQTY = + item.quantity;
    });

    console.log(this.cartTotalQTY);
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
