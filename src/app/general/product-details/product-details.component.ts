import { CartItem } from './../../models/cartItem.model';
import { ClientShoppingCartService } from './../../services/client-shopping-cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Upload } from '../../models/upload.model';
import { UploadService } from '../../services/upload.service';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  @Input() showBreadcrum = true;

  pageHeader = 'Product';
  pageText = `Lorem ipsum dolor sit amet consectetur adipisicing elit.`;

  productId: string;
  product: Product = {};
  gallery: Upload[] = [];

  clientCart: CartItem[] = [];

  pageUrl: string;

  subsription: Subscription;
  routeSubsription: Subscription;
  productSubsription: Subscription;
  cartSubsription: Subscription;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private uploadService: UploadService,
              private router: Router,
              private clientCartService: ClientShoppingCartService) { }

  ngOnInit() {
    this.routeSubsription = this.route.paramMap.subscribe(param => {
      this.productId = param.get('id');

      this.pageUrl = this.router.url;

      const avatars = [];
      this.subsription = this.uploadService.getAllGallery().subscribe(gallery => {
        gallery.forEach(item => {
          if (item.sourceId === this.productId) {
            avatars.push(item);
          }
        });

        this.gallery = avatars;
      });

      this.productSubsription = this.productService.getProduct(this.productId).subscribe(async product => {
        this.product = product;

        this.cartSubsription = (await this.clientCartService.getCart()).subscribe(cart => {
          this.clientCart = cart;
        });

      });
    });

  }

  ngOnDestroy(): void {
    if (this.routeSubsription) {
      this.routeSubsription.unsubscribe();
    }

    if (this.subsription) {
      this.subsription.unsubscribe();
    }

    if (this.productSubsription) {
      this.productSubsription.unsubscribe();
    }

    if (this.cartSubsription) {
      this.cartSubsription.unsubscribe();
    }
  }

  async addToCart($event) {
    $event.stopPropagation();

    // set productId
    this.product.id = this.productId;
    await this.clientCartService.addToCart(this.product);
  }

  async removeItemFromCart(event) {
    event.stopPropagation();

    // set productId
    this.product.id = this.productId;
    await this.clientCartService.removeFromCart(this.product);
  }

  getProduct() {
    if (this.clientCart.length < 1) { return 0; }

    return this.clientCart.find(c => c.id === this.productId);
  }

}
