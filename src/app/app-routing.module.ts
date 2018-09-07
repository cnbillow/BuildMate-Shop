import { ServiceDetailsComponent } from './general/service-details/service-details.component';
import { OurRecentProjectsComponent } from './general/our-recent-projects/our-recent-projects.component';
import { OurServicesComponent } from './general/our-services/our-services.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ManageStockComponent } from './admin/products/manage-stock/manage-stock.component';
import { ProductFormComponent } from './admin/products/product-form/product-form.component';
import { ProductProfileComponent } from './admin/products/product-profile/product-profile.component';
import { ProductRegistryComponent } from './admin/products/product-registry/product-registry.component';
import { StaffFormComponent } from './admin/staffs/staff-form/staff-form.component';
import { StaffProfileComponent } from './admin/staffs/staff-profile/staff-profile.component';
import { StaffsRegistryComponent } from './admin/staffs/staffs-registry/staffs-registry.component';
import { CheckOutComponent } from './admin/transactions/check-out/check-out.component';
import { OrderSuccessComponent } from './admin/transactions/order-success/order-success.component';
import { PosComponent } from './admin/transactions/pos/pos.component';
import {
  ProductTransactionLogComponent,
} from './admin/transactions/product-transaction-log/product-transaction-log.component';
import { ShoppingCartComponent } from './admin/transactions/shopping-cart/shopping-cart.component';
import { StaffOrderRemitComponent } from './admin/transactions/staff-order-remit/staff-order-remit.component';
import { StaffTransactionLogComponent } from './admin/transactions/staff-transaction-log/staff-transaction-log.component';
import { NewLoginComponent } from './auth/new-login/new-login.component';
import { HomePageComponent } from './general/home-page/home-page.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { GeneralLayoutComponent } from './layouts/general-layout/general-layout.component';
import { AuthGuard } from './services/auth.guard';
import { OurContactsComponent } from './general/our-contacts/our-contacts.component';
import { ProjectDetailsComponent } from './general/project-details/project-details.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: '',
    component: GeneralLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomePageComponent
      }, {
        path: 'service/:id',
        component: ServiceDetailsComponent
      }, {
        path: 'service-list',
        component: OurServicesComponent
      }, {
        path: 'contact-us',
        component: OurContactsComponent
      }, {
        path: 'project/:id',
        component: ProjectDetailsComponent
      }, {
        path: 'projects',
        component: OurRecentProjectsComponent
      },
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        // component: LoginFormComponent
        component: NewLoginComponent
      }
    ]
  }, {
    path: 'account',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      }, {
        path: 'product/:id',
        component: ProductProfileComponent,
        children: [
          {
            path: 'transaction-log',
            component: ProductTransactionLogComponent
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
        component: ProductRegistryComponent,
      }, {
        path: 'product-form',
        component: ProductFormComponent
      }, {
        path: 'staff/:id',
        component: StaffProfileComponent,
        children: [
          {
            path: 'transaction-log',
            component: StaffTransactionLogComponent
          }, {
            path: 'staff-update',
            component: StaffFormComponent
          }, {
            path: 'order-remit',
            component: StaffOrderRemitComponent
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
      }, {
        path: 'shopping-cart',
        component: ShoppingCartComponent
      }, {
        path: 'check-out',
        component: CheckOutComponent
      }, {
        path: 'order-success/:id',
        component: OrderSuccessComponent
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
