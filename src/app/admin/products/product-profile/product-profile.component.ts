import { AlertService } from './../../../services/alert.service';
import { switchMap } from 'rxjs/operators';
import { Product } from './../../../models/product.model';
import { Subscription } from 'rxjs';
import { ProductService } from './../../../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../../../models/category.model';
import { ProductCategoryService } from '../../../services/product-category.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-product-profile',
  templateUrl: './product-profile.component.html',
  styleUrls: ['./product-profile.component.scss']
})
export class ProductProfileComponent implements OnInit, OnDestroy {

  productId: string;

  product: Product = {};
  category: Category[] = [];

  routeToDisplay = 'overview';

  navLinks = [
    { path: 'transaction-log', label: 'Transaction Log', icon: 'assessment' },
    { path: 'edit-product', label: 'Edit', icon: 'border_color' },
    { path: 'manage-stock', label: 'Manage Stock', icon: 'updates' }
  ];

  selectedTab: string;
  parentUrl = `account/product/${this.productId}`;

  subscription: Subscription;

  constructor(private productService: ProductService,
              private categoryService: ProductCategoryService,
              private route: ActivatedRoute,
              private alertService: AlertService,
              private router: Router) { }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');

    this.parentUrl = `account/product/${this.productId}`;

    this.subscription = this.categoryService.getCategories().pipe(switchMap(resp => {
      this.category = resp;
      return this.productService.getProduct(this.productId);
    })).subscribe(result => {
      this.product = result;
    });

    // get the selected tab index
    return this.tabIndex;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  editProduct() {
    const url = `account/product/${this.productId}/edit-product`;
    this.router.navigate([url]);
  }

  async deleteProduct() {
    const confirm = await this.alertService.confirmDelete();
    if (confirm.value) {
      await this.productService.deleteProduct(this.productId);

      this.alertService.afterDeleteSuccess();
      this.router.navigate(['account', 'products']);
    }
  }

  // getLowQTYAlert() {
  //   if (this.product.availableQTY <= 10) {
  //     return 'warn';
  //   }

  //   // else
  //   return 'primary';
  // }

  getCategorDetails(categoryId: string) {
    if (!categoryId) {
      return;
    }

    const index = this.category.findIndex(c => c.id === categoryId);
    return this.category[index].name;
  }

  onLinkClick(event: MatTabChangeEvent) {
    const tabTitle = event.tab.textLabel;
    const routerLink = this.navLinks.find(n => n.label === tabTitle ).path;

    // if (routerLink === 'edit-product') {
    //   this.ngOnDestroy();
    // } else {
    //   this.ngOnInit();
    // }

    this.router.navigate([this.parentUrl, routerLink]);
  }

  get tabIndex() {
    const url = this.router.url;

    if (url.includes('transaction-log')) {
      return this.selectedTab = '0';
    }

    if (url.includes('edit-product')) {
      return this.selectedTab = '1';
    }
    if (url.includes('manage-stock')) {
      return this.selectedTab = '2';
    }
  }

  get tabIndexFromStorage() {
    return localStorage.getItem(this.tabIndex);
  }

  navigate(routeToDisplay: string) {
    this.routeToDisplay = routeToDisplay;
  }

}
