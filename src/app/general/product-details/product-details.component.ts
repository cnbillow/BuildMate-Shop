import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Upload } from '../../models/upload.model';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  @Input() showBreadcrum = true;

  pageHeader = 'Product';
  pageText = `Lorem ipsum dolor sit amet consectetur adipisicing elit.`;

  productId: string;
  product: Observable<Product>;
  gallery: Upload[] = [];


  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private uploadService: UploadService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      this.productId = param.get('id');

      const avatars = [];
      this.uploadService.getAllGallery().subscribe(gallery => {
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

  // getProductAvatar(avatarId: string) {
  //   if (!avatarId) { return; }

  //   const index = this.gallery.findIndex(g => g.Id === avatarId);
  //   return this.gallery[index].url;
  // }

}
