import { AlertService } from './../../../services/alert.service';
import { ShoppingCartService } from './../../../services/shopping-cart.service';
import { Category } from './../../../models/category.model';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ProductCategoryService } from '../../../services/product-category.service';
import { Subscription } from 'rxjs';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-pos-cart',
  templateUrl: './pos-cart.component.html',
  styleUrls: ['./pos-cart.component.scss']
})
export class PosCartComponent implements OnInit, OnDestroy {

  product: Product = {};
  category: Category[] = [];
  productQty: number;

  isLoading = true;
  subscription: Subscription;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private categoryService: ProductCategoryService,
              private cartService: ShoppingCartService,
              private dialogRef: MatDialogRef<PosCartComponent>,
              private alertService: AlertService) { }

  ngOnInit() {
    this.category = this.data['category'];
    this.product = this.data['product'];

    // add item to cart
    this.addToCart();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  async addToCart() {
    await this.cartService.addToCart(this.product);
    return this.getCartItem(this.product.id);
  }

  async getCartItem(productId) {
    const product = await this.cartService.getCartItem(productId);
    this.productQty = product ? product.quantity : 1;

    this.isLoading = false;
  }

  async removeFromCart() {
    await this.cartService.removeFromCart(this.product);
    return this.getCartItem(this.product.id);
  }

  async deleteFromCart() {
    const confirm = await this.alertService.confirmDelete();
    if (confirm.value) {
      await this.cartService.deleteFromCart(this.product);
      this.dialogRef.close();
    }
  }

  getCategorDetails(categoryId: string) {
    if (!categoryId) {
      return;
    }

    const index = this.category.findIndex(c => c.id === categoryId);
    return this.category[index].name;
  }

}