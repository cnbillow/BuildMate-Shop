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
        component: LoginComponent
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
