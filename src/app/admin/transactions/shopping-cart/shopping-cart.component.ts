import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';

import { Product } from '../../../models/product.model';
import { AlertService } from './../../../services/alert.service';
import { ProductService } from './../../../services/product.service';
import { ShoppingCartService } from './../../../services/shopping-cart.service';
import { Upload } from '../../../models/upload.model';
import { UploadService } from '../../../services/upload.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  @Input() hideControls;

  cartMap = [];
  cart = [];
  products: Product[] = [];

  galleryFiles: Upload[] = [];

  displayedColumns: string[] = ['image', 'product', 'quantity', 'total'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  showSpinner = true;
  subscription: Subscription;
  cartSubcription: Subscription;
  productSubsciption: Subscription;

  constructor(private cartService: ShoppingCartService,
              private productService: ProductService,
              private alertService: AlertService,
              private uploadService: UploadService) { }

  async ngOnInit() {

    this.subscription = this.uploadService.getAllGallery().pipe(switchMap(gallery => {
      this.galleryFiles = gallery;
      this.showSpinner = false;

      return this.productService.getProducts();
    })).subscribe(async products => {
      this.products = products;

      this.cartSubcription = (await this.cartService.getCart()).subscribe(cart => {
        this.cart = cart;

        this.cartMap = cart.map(c => {
          return {
            avatar: c.product.avatar,
            product: c.product.id,
            quantity: c.quantity,
            total: c.product.unitPrice * c.quantity
          };
        });

        this.dataSource = new MatTableDataSource(this.cartMap);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      });
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubcription) {
      this.cartSubcription.unsubscribe();
    }

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


  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.cartMap.map(t => t.total).reduce((acc, value) => acc + value, 0);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getTotalItemCount() {
    return this.cartService.getCartTotalItemCount(this.cart);
  }

  getProductDetails(productId: string) {
    if (!productId) {
      return;
    }

    const index = this.products.findIndex(p => p.id === productId);
    return this.products[index].pattern;
  }

  async clearCart() {
    const confirm = await this.alertService.confirmDelete();
    if (confirm.value) {
      await this.cartService.clearCart();

      this.alertService.afterDeleteSuccess();
    }
  }

}
