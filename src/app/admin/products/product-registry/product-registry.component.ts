import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Product } from '../../../models/product.model';
import { Upload } from '../../../models/upload.model';
import { ProductCategoryService } from '../../../services/product-category.service';
import { Category } from './../../../models/category.model';
import { ProductService } from './../../../services/product.service';
import { UploadService } from './../../../services/upload.service';

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

  galleryFiles: Upload[] = [];

  category: Category[] = [];

  showSpinner = true;
  subscription: Subscription;

  constructor(private productService: ProductService,
              private categoryService: ProductCategoryService,
              private uploadService: UploadService) { }

  ngOnInit() {

    this.subscription = this.uploadService.getAllGallery().pipe(switchMap(resp => {
      this.galleryFiles = resp;
      this.showSpinner = false;

      return this.categoryService.getCategories();
    })).pipe(switchMap(resp => {
      this.category = resp;

      return this.productService.getProducts();
    })).subscribe(result => {
      this.product = this.filteredProduct = result;
    });

    // this.subscription = this.categoryService.getCategories().pipe(switchMap(resp => {
    //   this.category = resp;
    //   this.showSpinner = false;
    //   return this.productService.getProducts();
    // })).subscribe(result => {
    //   this.product = this.filteredProduct = result;
    // });
  }

  ngOnDestroy(): void {
   if (this.subscription) {
     this.subscription.unsubscribe();
    }
  }

  getAvatarDetails(avatarId: string) {
    if (!avatarId) {
      return;
    }

    const index = this.galleryFiles.findIndex(g => g.Id === avatarId);
    return this.galleryFiles[index].url;
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
