import { StockOrdersComponent } from './admin/transactions/stock-orders/stock-orders.component';
import { StaffProfileComponent } from './admin/staffs/staff-profile/staff-profile.component';
import { StaffFormComponent } from './admin/staffs/staff-form/staff-form.component';
import { StaffsRegistryComponent } from './admin/staffs/staffs-registry/staffs-registry.component';
import { ManageStockComponent } from './admin/products/manage-stock/manage-stock.component';
import { TransactionLogComponent } from './admin/products/transaction-log/transaction-log.component';
import { ProductFormComponent } from './admin/products/product-form/product-form.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { GeneralLayoutComponent } from './layouts/general-layout/general-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './general/home-page/home-page.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ProductRegistryComponent } from './admin/products/product-registry/product-registry.component';
import { ProductProfileComponent } from './admin/products/product-profile/product-profile.component';
import { PosComponent } from './admin/transactions/pos/pos.component';
import { NewLoginComponent } from './auth/new-login/new-login.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  }, {
    path: '',
    component: GeneralLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomePageComponent
      }
    ]
  }, {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: NewLoginComponent
      }
    ]
  }, {
    path: 'account',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      }, {
        path: 'product/:id',
        component: ProductProfileComponent,
        children: [
          {
            path: 'transaction-log',
            component: TransactionLogComponent
          }, {
            path: 'edit-product',
            component: ProductFormComponent
          }, {
            path: 'manage-stock',
            component: ManageStockComponent
          }
        ]
      }, {
        path: 'products',
        component: ProductRegistryComponent
      }, {
        path: 'product-form',
        component: ProductFormComponent
      }, {
        path: 'staff/:id',
        component: StaffProfileComponent,
        children: [
          {
            path: 'transaction-log',
            component: StockOrdersComponent
          }, {
            path: 'staff-update',
            component: StaffFormComponent
          }
        ]
      }, {
        path: 'staffs',
        component: StaffsRegistryComponent
      }, {
        path: 'staff-form',
        component: StaffFormComponent
      }, {
        path: 'pos',
        component: PosComponent
      }
    ]
  }, {
    path: '**', redirectTo: '/home', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
