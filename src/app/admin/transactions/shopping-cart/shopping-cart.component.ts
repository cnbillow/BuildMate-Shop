import { AlertService } from './../../../services/alert.service';
import { ProductService } from './../../../services/product.service';
import { CartItem } from './../../../models/cartItem.model';
import { ShoppingCartService } from './../../../services/shopping-cart.service';
import { Component, OnInit, ViewChild, NgZone, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Subscription } from 'rxjs';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  cartMap = [];
  cart = [];
  products: Product[] = [];

  displayedColumns: string[] = ['image', 'product', 'quantity', 'total'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  cartSubcription: Subscription;
  productSubsciption: Subscription;

  constructor(private cartService: ShoppingCartService,
              private productService: ProductService,
              private alertService: AlertService) { }

  async ngOnInit() {

    this.productSubsciption = this.productService.getProducts().subscribe(async resp => {
      this.products = resp;

      this.cartSubcription = (await this.cartService.getCart()).subscribe(result => {
        this.cart = result;

        this.cartMap = result.map(c => {
          return {
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

    if (this.productSubsciption) {
      this.productSubsciption.unsubscribe();
    }
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
