import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { Category } from '../../../models/category.model';
import { Product } from '../../../models/product.model';
import { ProductCategoryComponent } from '../product-category/product-category.component';
import { AlertService } from './../../../services/alert.service';
import { ProductCategoryService } from './../../../services/product-category.service';
import { ProductService } from './../../../services/product.service';
import { UploadService } from './../../../services/upload.service';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnDestroy {

  productId: string;

  product: Product = {};
  categories$: Observable<Category[]>;

  step = 0;

  imageUrl = '../../../../assets/avatars/avatar3.png';
  fileToUpload: File[] = [];
  imagePreview: any;
  uploadError;
  isHovering: boolean;

  subscription: Subscription;

  constructor(private dialog: MatDialog,
              private categoryService: ProductCategoryService,
              private productService: ProductService,
              private alertService: AlertService,
              private router: Router,
              private route: ActivatedRoute,
              private uploadService: UploadService,
              private ng2ImgMax: Ng2ImgMaxService,
              public sanitizer: DomSanitizer) {
                this.categories$ = this.categoryService.getCategories();
              }

  ngOnInit() {
    this.productId = this.route.parent.snapshot.paramMap.get('id');

    if (this.productId) {
      this.subscription = this.productService.getProduct(this.productId).subscribe(resp => {
        this.product = resp;
      });
    }
  }

  ngOnDestroy(): void {
   if (this.subscription) {
     this.subscription.unsubscribe();
    }
  }

  async onSubmit() {
    const confirm = await this.alertService.confirmUpdate();
    if (confirm.value) {

      if (this.productId) {
        await this.productService.updateProduct(this.productId, this.product);

        this.alertService.afterUpdateSuccess();
        this.router.navigate(['account', 'products']);
        return;
      }

      // else
      const productData = await this.productService.addProduct(this.product);
      const productId = (await productData.product).id;
      const avatar = productData.avatar;

      this.uploadService.pushUpload(this.fileToUpload, productId, 'PRODUCT', avatar);

      this.alertService.afterUpdateSuccess();
      this.router.navigate(['account', 'products']);
    }
  }

  toggleHover($event: boolean) {
    this.isHovering = $event;
  }

  onImageChange(event) {
    const image: File = event.target.files[0];
    this.uploadError = null;

    if (image.size > 512000) {
      this.uploadError = 'File should not exceed 500KB';
      console.log('😢 File should not exceed 500KB');
      return;
    }

    this.ng2ImgMax.compressImage(image, 0.050).subscribe(
      result => {
        this.fileToUpload.push(new File([result], result.name));
        this.getImagePreview(this.fileToUpload[0]);
      },
      error => {
        this.uploadError = error.reason;
        console.log('😢 Oh no!', error);
      }
    );
  }

  getImagePreview(file: File) {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageUrl = reader.result.toString();
    };
  }

  // handleFileInput(file: FileList) {
  //   this.fileToUpload = file;

  //   // if (this.fileToUpload.item(0).type !== 'image') {
  //   //   console.log('unsupported file type :( ');
  //   // }

  //   // show image preview
  //   const reader = new FileReader();
  //   reader.onload = (event: any) => {
  //     this.imageUrl = event.target.result;
  //   };
  //   reader.readAsDataURL(this.fileToUpload.item(0));
  // }

  addCategory() {
    this.dialog.open(ProductCategoryComponent, {
      height: '500px',
      width: '500px'
    });
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
