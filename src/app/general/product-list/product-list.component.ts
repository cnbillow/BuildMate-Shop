import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, switchMap } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Upload } from '../../models/upload.model';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit,  OnDestroy {

  products: Product[] = [];
  gallery: Upload[] = [];

  subscription: Subscription;
  constructor(private productService: ProductService,
              private uploadService: UploadService) { }

  ngOnInit() {
    this.subscription = this.uploadService.getAllGallery().pipe(switchMap(gallery => {
      this.gallery = gallery;
      console.log(gallery);

      return this.productService.getProducts();
    })).subscribe(products => {
      this.products = products;
      console.log(products);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getProductAvatar(avatarId: string) {
    if (!avatarId) { return; }

    const index = this.gallery.findIndex(g => g.Id === avatarId);
    return this.gallery[index].url;
  }

}
