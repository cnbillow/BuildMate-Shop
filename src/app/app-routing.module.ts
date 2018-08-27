import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { GeneralLayoutComponent } from './layouts/general-layout/general-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './general/home-page/home-page.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ProductRegistryComponent } from './admin/products/product-registry/product-registry.component';

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
        path: 'products',
        component: ProductRegistryComponent
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
