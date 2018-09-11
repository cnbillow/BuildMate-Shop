import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Upload } from 'src/app/models/upload.model';
import { Product } from './../../models/product.model';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit, OnDestroy {

  @Input() product: Product = {};
  @Input() avatar;

  user;

  pageUrl: string;

  subscription: Subscription;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.pageUrl = this.router.url;

    this.subscription = this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  addToCart($event) {
    $event.stopPropagation();
  }

  async productDetails() {
    try {
      if (this.user) {
        return this.router.navigate(['product', this.product.id]);
      }

      // else
      await this.authService.loginFacebook();
      return this.router.navigate(['product', this.product.id]);
    } catch (error) {
      console.log(error);
    }
  }

}
