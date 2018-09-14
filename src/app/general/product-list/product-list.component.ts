import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Product } from '../../models/product.model';
import { Upload } from '../../models/upload.model';
import { ProductService } from '../../services/product.service';
import { UploadService } from '../../services/upload.service';
import { ClientShoppingCartService } from '../../services/client-shopping-cart.service';
import { CartItem } from '../../models/cartItem.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit,  OnDestroy {

  clientCart: CartItem[] = [];

  products: Product[] = [];
  gallery: Upload[] = [];

  subscription: Subscription;
  cartSubscription: Subscription;
  constructor(private productService: ProductService,
              private uploadService: UploadService,
              private clientCartService: ClientShoppingCartService) { }

  async ngOnInit() {
    this.cartSubscription = (await this.clientCartService.getCart()).subscribe(cart => {
      this.clientCart = cart;

      this.subscription = this.uploadService.getAllGallery().pipe(switchMap(gallery => {
        this.gallery = gallery;

        return this.productService.getProducts();
      })).subscribe(products => {
        this.products = products;
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  getProductAvatar(avatarId: string) {
    if (!avatarId) { return; }

    const index = this.gallery.findIndex(g => g.Id === avatarId);
    return this.gallery[index].url;
  }

}
