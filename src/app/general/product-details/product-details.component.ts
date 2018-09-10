import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Upload } from '../../models/upload.model';
import { UploadService } from '../../services/upload.service';

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
  product: Observable<Product>;
  gallery: Upload[] = [];

  subsription: Subscription;
  routeSubsription: Subscription;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private uploadService: UploadService) { }

  ngOnInit() {
    this.routeSubsription = this.route.paramMap.subscribe(param => {
      this.productId = param.get('id');

      const avatars = [];
      this.subsription = this.uploadService.getAllGallery().subscribe(gallery => {
        gallery.forEach(item => {
          if (item.sourceId === this.productId) {
            avatars.push(item);
          }
        });

        this.gallery = avatars;

        this.product = this.productService.getProduct(this.productId);
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
  }

  // getProductAvatar(avatarId: string) {
  //   if (!avatarId) { return; }

  //   const index = this.gallery.findIndex(g => g.Id === avatarId);
  //   return this.gallery[index].url;
  // }

}
